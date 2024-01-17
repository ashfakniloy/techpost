"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function deletePostAdmin({
  deleteId,
}: {
  deleteId: string | string[];
}) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  if (!deleteId) {
    return { error: "Need to pass post id" };
  }

  if (typeof deleteId === "string") {
    const responseImageIds = await prisma.post.findMany({
      where: {
        id: {
          in: [deleteId],
        },
      },
      select: {
        imageId: true,
      },
    });

    const imageIds = responseImageIds.map((response) => response.imageId);

    try {
      const response = await prisma.post.delete({
        where: {
          id: deleteId,
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.uploader.destroy(
          imageIds.length > 1
            ? await cloudinary.v2.api.delete_resources(imageIds)
            : await cloudinary.v2.uploader.destroy(imageIds[0])
        );
      }

      revalidatePath("/", "layout");
      revalidateTag("editorsChoice");

      return { success: "Post deleted", data: response };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    const responseImageIds = await prisma.post.findMany({
      where: {
        id: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const imageIds = responseImageIds.map((response) => response.imageId);

    try {
      const response = await prisma.post.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse =
          imageIds.length > 1
            ? await cloudinary.v2.api.delete_resources(imageIds)
            : await cloudinary.v2.uploader.destroy(imageIds[0]);
      }

      revalidatePath("/", "layout");
      revalidateTag("editorsChoice");

      return { success: `${deleteId.length} post deleted`, data: response };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }
}

export type deletePostAdminProps = typeof deletePostAdmin;
