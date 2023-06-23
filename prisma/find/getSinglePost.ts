import { prisma } from "@/lib/prisma";

export async function getSinglePost({ postId }: { postId: string }) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
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

      _count: {
        select: {
          views: true,
        },
      },
    },
  });

  return { data };
}
