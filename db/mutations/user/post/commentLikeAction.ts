"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function commentLikeAction({
  commentId,
  hasLiked,
}: {
  commentId: string;
  hasLiked: boolean;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof commentId !== "string") {
    return { error: "Invalid commentId" };
  }

  if (!hasLiked) {
    try {
      const response = await prisma.commentLike.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          comment: {
            connect: {
              id: commentId,
            },
          },
        },
        include: {
          comment: {
            include: {
              commentsLikes: true,
            },
          },
        },
      });

      revalidatePath("/post/[slug]", "page");
      revalidatePath("/admin", "layout");

      return {
        success: "Comment Liked",
        data: response,
      };
    } catch (error) {
      // console.log(error);
      return { error: "Something went wrong", data: error };
    }
  } else {
    try {
      const response = await prisma.commentLike.delete({
        where: {
          commentId_userId: {
            userId: session.user.id,
            commentId: commentId,
          },
        },
        select: {
          comment: {
            select: {
              commentsLikes: true,
            },
          },
        },
      });

      revalidatePath("/post/[slug]", "page");
      revalidatePath("/admin", "layout");

      return {
        success: "Comment Unliked",
        data: response,
      };
    } catch (error) {
      // console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }
}
