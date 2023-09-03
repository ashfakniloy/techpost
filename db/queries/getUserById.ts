import { prisma } from "@/lib/prisma";

export async function getUserById({ userId }: { userId: string | undefined }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}
