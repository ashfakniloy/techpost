import { prisma } from "@/lib/prisma";

export async function getCommentReplies({ commentId }: { commentId: string }) {
  const count = await prisma.commentReply.count({
    where: {
      commentId: commentId,
    },
  });

  const data = await prisma.commentReply.findMany({
    where: {
      commentId: commentId,
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
    },
  });

  return {
    count,
    data,
  };
}
