import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getComments({ postId }: { postId: string }) {
  const count = await prisma.comment.count({
    where: {
      postId: postId,
    },
  });

  const data = await prisma.comment.findMany({
    where: {
      postId: postId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          username: true,
          id: true,
          profile: {
            select: {
              imageUrl: true,
            },
          },
        },
      },

      commentsReplies: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
              profile: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      },

      commentsLikes: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
              profile: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      },

      _count: {
        select: {
          commentsLikes: true,
          commentsReplies: true,
        },
      },
    },
  });

  return {
    count,
    data,
  };
}

export type CommentTypes = Prisma.PromiseReturnType<
  typeof getComments
>["data"][number];
