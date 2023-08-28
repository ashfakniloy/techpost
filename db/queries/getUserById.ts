import { prisma } from "@/lib/prisma";

export async function getUserById({ userId }: { userId: string | undefined }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
