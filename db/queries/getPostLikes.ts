import { prisma } from "@/lib/prisma";

export async function getPostLikes({ postId }: { postId: string }) {
  const count = await prisma.like.count({
    where: {
      postId: postId,
    },
  });

  const data = await prisma.like.findMany({
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
    },
  });

  return { data, count };
}
