import { prisma } from "@/lib/prisma";

export async function getCategoryByName({
  categoryName,
}: {
  categoryName: string;
}) {
  const data = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
    include: {
      posts: true,
      quotes: {
        select: {
          // id: true,
          author: true,
          quote: true,
        },
      },
      _count: true,
    },
    // select: {
    //   name: true,
    //   imageUrl: true,
    //   imageId: true,
    //   quotes: {
    //     select: {
    //       author: true,
    //       quote: true,
    //     },
    //   },
    //   posts: true,
    //   _count: {
    //     select: {
    //       posts: true,
    //     },
    //   },
    // },
  });

  return { data };
}
