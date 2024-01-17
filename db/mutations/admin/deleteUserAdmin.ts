"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function deleteUserAdmin({
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
    const responseProfileImageId = await prisma.profile.findUnique({
      where: {
        userId: deleteId,
      },
      select: {
        imageId: true,
      },
    });

    const responsePostsImagesId = await prisma.post.findMany({
      where: {
        userId: deleteId,
      },
      select: {
        imageId: true,
      },
    });

    const profileImageId = responseProfileImageId?.imageId;

    const postsImagesIds = responsePostsImagesId.map(
      (response) => response.imageId
    );

    const imageIds = [...postsImagesIds, profileImageId].filter(
      (imageId): imageId is string => imageId !== null
    );

    try {
      const response = await prisma.user.delete({
        where: {
          id: deleteId,
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
          imageIds
        );
      }

      revalidatePath("/", "layout");
      revalidateTag("editorsChoice");

      return { success: `User ${response.username} deleted`, data: response };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }

  if (Array.isArray(deleteId)) {
    const responseProfileImageIds = await prisma.profile.findMany({
      where: {
        userId: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const responsePostsImagesIds = await prisma.post.findMany({
      where: {
        userId: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const profileImageIds = responseProfileImageIds
      .map((response) => response.imageId)
      .filter((imageId): imageId is string => imageId !== null);

    const postsImagesIds = responsePostsImagesIds.map(
      (response) => response.imageId
    );

    const imageIds = [...postsImagesIds, ...profileImageIds];

    try {
      const response = await prisma.user.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
          imageIds
        );
      }

      revalidatePath("/", "layout");
      revalidateTag("editorsChoice");

      return { success: `${deleteId.length} user deleted`, data: response };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}

export type deleteUserAdminProps = typeof deleteUserAdmin;
