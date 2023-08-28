import { prisma } from "@/lib/prisma";

export async function getRelatedPosts({
  categoryName,
  limit,
}: {
  categoryName: string;
  limit: number;
}) {
  try {
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

      where: {
        categoryName: categoryName,
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
            comments: true,
            views: true,
          },
        },
      },
    });

    return { data };
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
