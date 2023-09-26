import { prisma } from "@/lib/prisma";

export async function getUserById({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}
