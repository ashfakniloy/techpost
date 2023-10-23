import { prisma } from "@/lib/prisma";

export async function getMorePostsByUsername({
  username,
  limit,
}: {
  username: string;
  limit?: number;
}) {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      user: {
        username: username,
      },
    },

    take: limit,

    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      imageUrl: true,
      imageId: true,
      categoryName: true,
      createdAt: true,
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

    // include: {
    //   user: {
    //     select: {
    //       username: true,
    //       id: true,
    //     },
    //   },
    //   _count: {
    //     select: {
    //       comments: true,
    //     },
    //   },
    // },
  });

  return { data };
}
