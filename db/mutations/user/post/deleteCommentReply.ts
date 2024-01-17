"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteCommentReply({
  commentReplyId,
}: {
  commentReplyId: string;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof commentReplyId !== "string") {
    return { error: "Invalid commentReplyId" };
  }

  try {
    const response = await prisma.commentReply.delete({
      where: {
        id: commentReplyId,
      },
    });

    // revalidatePath("/(user)/(content)/post/[slug]", "page");
    revalidatePath("/post/[slug]", "page");
    revalidatePath("/admin", "layout");

    return {
      success: "Comment Reply Deleted",
      data: response,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
