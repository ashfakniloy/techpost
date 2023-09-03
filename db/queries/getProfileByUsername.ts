import { prisma } from "@/lib/prisma";

export async function getProfileByUsername({
  username,
}: {
  username: string | undefined;
}) {
  const data = await prisma.profile.findFirst({
    where: {
      user: {
        username: username,
      },
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
