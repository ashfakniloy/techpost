import { prisma } from "@/lib/prisma";

export async function getProfileByUsername({
  username,
}: {
  username: string | undefined;
}) {
  try {
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
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
