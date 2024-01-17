"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteComment({ commentId }: { commentId: string }) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof commentId !== "string") {
    return { error: "Invalid commentId" };
  }

  try {
    const response = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    // revalidatePath("/(user)/(content)/post/[slug]", "page");
    revalidatePath("/post/[slug]", "page");
    revalidatePath("/admin", "layout");

    return { success: "Comment Deleted", data: response };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
