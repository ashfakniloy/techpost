"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import cloudinary from "@/lib/cloudinary";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteCategory({ categoryId }: { categoryId: string }) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  if (!categoryId) {
    return { error: "Need to pass category Id" };
  }

  const responseCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      imageId: true,
      name: true,
    },
  });

  const responsePostsImagesId = await prisma.post.findMany({
    where: {
      categoryName: responseCategory?.name,
    },
    select: {
      imageId: true,
    },
  });

  const categoryImageId = responseCategory?.imageId;

  const postsImagesIds = responsePostsImagesId.map(
    (response) => response.imageId
  );

  const imageIds = [...postsImagesIds, categoryImageId].filter(
    (imageId): imageId is string => imageId !== null
  );

  try {
    const response = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    if (response && imageIds.length > 0) {
      const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
        imageIds
      );
    }

    revalidatePath("/", "layout");
    revalidateTag("categories");
    revalidateTag(`category-${responseCategory?.name.toLowerCase()}`);
    revalidateTag("editorsChoice");

    return { success: `Category ${response.name} deleted`, data: response };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
