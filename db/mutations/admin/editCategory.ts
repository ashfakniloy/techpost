"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";

export async function editCategory({
  categoryId,
  values,
}: {
  categoryId: string;
  values: CategoryFormProps;
}) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  if (!categoryId) {
    return { error: "Need to pass category Id" };
  }

  const parsedBody = categorySchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { name, imageUrl, imageId, quotes } = data;

  const categoryResponse = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (categoryResponse?.name.toLowerCase() !== name.toLowerCase()) {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (categoryExists) {
      return { error: "Category already exists" };
    }
  }

  try {
    const response = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        imageUrl,
        imageId,
      },
    });

    if (response.id) {
      const quoteWithCategoryId = quotes.map((quote) => ({
        ...quote,
        categoryId: response.id,
      }));

      const quoteDeleteResponse = await prisma.quote.deleteMany({
        where: {
          categoryId: categoryId,
        },
      });

      const quotesResponse = await prisma.quote.createMany({
        data: quoteWithCategoryId,
      });
    }

    revalidatePath("/", "layout");
    revalidateTag("categories");
    revalidateTag(`category-${name.toLowerCase()}`);
    revalidateTag("editorsChoice");

    return {
      success: "Category updated successfully",
      data: response,
    };
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     return NextResponse.json(
    //       { error: "Category already exists" },
    //       { status: 400 }
    //     );
    //   }
    // }
    return { error: "Something went wrong", data: error };
  }
}
