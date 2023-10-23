import { prisma } from "@/lib/prisma";

export async function getRelatedPosts({
  categoryName,
  limit,
}: {
  categoryName: string;
  limit: number;
}) {
  const data = await prisma.post.findMany({
    orderBy: [
      {
        likes: {
          _count: "desc",
        },
      },
      {
        comments: {
          _count: "desc",
        },
      },
      {
        views: {
          _count: "desc",
        },
      },
    ],

    // where: {
    //   categoryName: categoryName,
    // },
    where: {
      categoryName: {
        equals: categoryName,
        mode: "insensitive",
      },
    },

    take: limit,
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
          views: true,
        },
      },
    },
  });

  return { data };
}
