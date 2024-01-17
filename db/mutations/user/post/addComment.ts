"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { CommentFormProps, commentSchema } from "@/schemas/commentSchema";

export async function addComment({
  values,
  postId,
}: {
  values: CommentFormProps;
  postId: string;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  const parsedComment = commentSchema.safeParse(values);

  if (!parsedComment.success) {
    const { errors } = parsedComment.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedComment;
  const { comment: commentParsed } = data;

  try {
    const response = await prisma.comment.create({
      data: {
        comment: commentParsed,
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
      },
    });

    // revalidatePath("/(user)/(content)/post/[slug]", "page");
    revalidatePath("/post/[slug]", "page");
    revalidatePath("/admin", "layout");

    return { success: "Comment Submitted", data: response };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
