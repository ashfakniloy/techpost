import { prisma } from "@/lib/prisma";
import { PER_PAGE } from "@/config";
import { Prisma } from "@prisma/client";

export async function getAllPosts({
  limitNumber,
  pageNumber,
  sort,
}: {
  limitNumber: number;
  pageNumber?: number;
  sort?: string;
}) {
  try {
    const currentPage = Math.max(pageNumber || 1, 1);

    const count = await prisma.post.count();

    const getDataBySort = async () => {
      if (!sort || sort === "recent") {
        const data = await prisma.post.findMany({
          orderBy: {
            createdAt: "desc",
          },

          take: limitNumber || PER_PAGE,
          skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

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
          //       views: true,
          //     },
          //   },
          // },
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

          take: limitNumber || PER_PAGE,
          skip: (currentPage - 1) * (limitNumber || PER_PAGE) || 0,

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
          //       views: true,
          //     },
          //   },
          // },
        });

        return data;
      }
    };

    const data = await getDataBySort();

    return {
      data,
      count,
    };
  } catch (error: any) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch", error);
  }
}

export type AllPostTypes = Prisma.PromiseReturnType<typeof getAllPosts>["data"];
