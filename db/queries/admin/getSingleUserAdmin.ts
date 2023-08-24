import { prisma } from "@/lib/prisma";

export async function getSingleUserAdmin({
  username,
}: {
  username: string | undefined;
}) {
  // const data = await prisma.profile.findFirst({
  //   where: {
  //     user: {
  //       username: username,
  //     },
  //   },

  //   include: {
  //     user: {
  //       select: {
  //         username: true,
  //       },
  //     },
  //   },
  // });

  const data = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
        },
      },
      posts: {
        select: {
          _count: {
            select: {
              views: true,
            },
          },
        },
      },
    },
  });

  return { data };
}
