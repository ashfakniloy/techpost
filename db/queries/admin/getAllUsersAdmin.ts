import { prisma } from "@/lib/prisma";

export async function getAllUsersAdmin({
  limitNumber,
  pageNumber,
  sortBy,
  order,
  username,
}: {
  limitNumber: number;
  pageNumber?: number;
  sortBy?: string;
  order?: string;
  username?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const usersCount = await prisma.user.count({
    where: {
      username: {
        startsWith: username,
        mode: "insensitive",
      },
    },
  });

  const sortCase = () => {
    switch (sortBy) {
      case "username":
        return {
          username: order,
        };

      case "email":
        return {
          email: order,
        };

      case "posts":
        return {
          posts: {
            _count: order,
          },
        };

      case "created at":
        return {
          createdAt: order,
        };

      // case "updated at":
      //   return {
      //     updatedAt: order,
      //   };

      default:
        // return {
        //   createdAt: order,
        // };
        break;
    }
  };

  const sorting = sortCase() as any;

  const users = await prisma.user.findMany({
    orderBy: sorting || {
      createdAt: "desc",
    },

    where: {
      username: {
        startsWith: username,
        mode: "insensitive",
      },
    },

    take: limitNumber,
    skip: (currentPage - 1) * limitNumber || 0,

    include: {
      _count: {
        select: {
          posts: true,
        },
      },
      profile: {
        select: {
          imageUrl: true,
          imageId: true,
        },
      },
    },
    // include: {
    //   user: {
    //     select: {
    //       username: true,
    //       id: true,
    //       profile: {
    //         select: {
    //           imageUrl: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  return { users, usersCount };
}
