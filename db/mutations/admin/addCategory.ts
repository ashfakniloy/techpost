"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";

export async function addCategory({ values }: { values: CategoryFormProps }) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  const parsedBody = categorySchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { name, imageUrl, imageId, quotes } = data;

  const categoryExist = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (categoryExist) {
    return { error: "Category already exists" };
  }

  try {
    const response = await prisma.category.create({
      data: {
        name,
        imageUrl,
        imageId,
      },
    });

    if (response.id) {
      const quotesWithId = quotes.map((quote) => ({
        ...quote,
        categoryId: response.id,
      }));

      const quotesResponse = await prisma.quote.createMany({
        data: quotesWithId,
      });
    }

    revalidatePath("/", "layout");
    revalidateTag("categories");
    revalidateTag(`category-${name.toLowerCase()}`);
    revalidateTag("editorsChoice");

    return {
      success: "Category created successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
