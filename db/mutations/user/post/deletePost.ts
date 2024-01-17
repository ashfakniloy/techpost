"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function deletePost({ postId }: { postId: string }) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  const isAdmin = session.user.role === "ADMIN";

  try {
    const response = isAdmin
      ? await prisma.post.delete({
          where: {
            id: postId,
          },
        })
      : await prisma.post.delete({
          where: {
            id_userId: {
              id: postId,
              userId: session.user.id,
            },
          },
        });

    revalidatePath("/", "layout");

    if (response.editorsChoice) {
      revalidateTag("editorsChoice");
    }

    if (response.imageId) {
      await cloudinary.v2.uploader.destroy(response.imageId);
    }

    return { success: "Post deleted successfully", data: response };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
