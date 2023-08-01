import { prisma } from "@/lib/prisma";

export async function getEditorsChoicePost() {
  const data = await prisma.post.findFirst({
    where: {
      editorsChoice: true,
    },

    include: {
      user: {
        select: {
          username: true,
          id: true,
          profile: {
            select: {
              imageUrl: true,
            },
          },
        },
      },

      _count: {
        select: {
          views: true,
        },
      },
    },
  });

  return { data };
}
