import { prisma } from "@/lib/prisma";

export async function getProfileByUserId({
  userId,
}: {
  userId: string | undefined;
}) {
  try {
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
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
