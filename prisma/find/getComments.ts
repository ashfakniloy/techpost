import { prisma } from "@/lib/prisma";

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
    },
  });

  return {
    count,
    data,
  };
}
