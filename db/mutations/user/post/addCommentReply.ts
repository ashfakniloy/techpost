"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { commentReplySchema, CommentReplyProps } from "@/schemas/commentSchema";

export async function addCommentReply({
  values,
  commentId,
  postId,
}: {
  values: CommentReplyProps;
  commentId: string;
  postId: string;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof commentId !== "string") {
    return { error: "Invalid commentId" };
  }

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  const parsedCommentReply = commentReplySchema.safeParse(values);

  if (!parsedCommentReply.success) {
    const { errors } = parsedCommentReply.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedCommentReply;
  const { commentReply: commentReplyParsed } = data;

  try {
    const response = await prisma.commentReply.create({
      data: {
        commentReply: commentReplyParsed,

        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
    });

    revalidatePath("/post/[slug]", "page");
    revalidatePath("/admin", "layout");

    return { success: "Reply Submitted", data: response };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
