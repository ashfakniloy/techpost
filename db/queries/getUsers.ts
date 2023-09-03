import { prisma } from "@/lib/prisma";

export async function getUsers() {
  const usersCount = await prisma.user.count();

  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          posts: true,
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
