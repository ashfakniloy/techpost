import { prisma } from "@/lib/prisma";

export async function getCommentLikes({ commentId }: { commentId: string }) {
  const count = await prisma.commentLike.count({
    where: {
      commentId: commentId,
    },
  });

  const data = await prisma.commentLike.findMany({
    where: {
      commentId: commentId,
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
    },
  });

  return { data, count };
}
