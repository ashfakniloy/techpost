import { prisma } from "@/lib/prisma";
import { PER_PAGE } from "@/config";

export async function getAllPostsAdmin({
  limitNumber,
  pageNumber,
  sortBy,
  order,
  title,
  categoryName,
}: {
  limitNumber: number;
  pageNumber?: number;
  sortBy?: string;
  order?: string;
  title?: string;
  categoryName?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const count = await prisma.post.count({
    where: {
      title: {
        startsWith: title,
        mode: "insensitive",
      },
    },
  });

  const sortCase = () => {
    switch (sortBy) {
      case "title":
        return {
          title: order,
        };

      case "category":
        return {
          categoryName: order,
        };

      case "created at":
        return {
          createdAt: order,
        };

      case "username":
        return {
          user: {
            username: order,
          },
        };

      case "comments":
        return {
          comments: {
            _count: order,
          },
        };

      case "views":
        return {
          views: {
            _count: order,
          },
        };

      default:
        // return {
        //   createdAt: order,
        // };
        break;
    }
  };

  // const sorting = {
  //   [`${sortBy}`]: order,
  // };

  const sorting = sortCase() as any;

  const data = await prisma.post.findMany({
    orderBy: sorting || {
      createdAt: "desc",
    },

    where: {
      title: {
        startsWith: title,
        mode: "insensitive",
      },
      categoryName: {
        startsWith: categoryName,
        mode: "insensitive",
      },
    },

    take: limitNumber,
    skip: (currentPage - 1) * limitNumber || 0,

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
          likes: true,
        },
      },
    },
  });

  return {
    data,
    count,
  };
}