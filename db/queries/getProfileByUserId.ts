import { prisma } from "@/lib/prisma";

export async function getProfileByUserId({
  userId,
}: {
  userId: string | undefined;
}) {
  const data = await prisma.profile.findUnique({
    where: {
      userId: userId ? userId : "",
    },

    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return { data };
}
