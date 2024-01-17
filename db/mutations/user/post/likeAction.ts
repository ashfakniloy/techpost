"use server";

import { revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function likeAction({
  postId,
  hasLiked,
}: {
  postId: string;
  hasLiked: boolean;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  if (!hasLiked) {
    try {
      const response = await prisma.like.create({
        data: {
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
        include: {
          post: {
            select: {
              likes: true,
            },
          },
        },
      });

      revalidateTag("counts");

      return { success: "Liked Successfully", data: response };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  } else {
    try {
      const response = await prisma.like.delete({
        where: {
          postId_userId: {
            userId: session.user.id,
            postId: postId,
          },
        },
        select: {
          post: {
            select: {
              likes: true,
            },
          },
        },
      });

      revalidateTag("counts");

      return { success: "Unliked Successfully", data: response };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }
}
