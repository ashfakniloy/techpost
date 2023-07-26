import { PER_PAGE } from "@/config";
import { prisma } from "@/lib/prisma";

export async function getPostsByCategory({
  categoryName,
  limitNumber,
  pageNumber,
  sort,
}: {
  categoryName: string;
  limitNumber: number;
  pageNumber?: number;
  sort?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count({
    where: {
      categoryName: categoryName,
    },
  });

  const getDataBySort = async () => {
    if (!sort || sort === "recent") {
      const data = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },

        where: {
          categoryName: {
            equals: categoryName,
            mode: "insensitive",
          },
        },

        take: limitNumber || PER_PAGE,
        skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

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

      return data;
    }

    if (sort === "popular") {
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

        take: limitNumber || PER_PAGE,
        skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

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

      return data;
    }
  };

  const data = await getDataBySort();

  return {
    data,
    count,
  };
}
