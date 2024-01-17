import { prisma } from "@/lib/prisma";

export async function getFirstYear() {
  const firstDateEntry = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
    },
  });

  const firstYear =
    firstDateEntry?.createdAt.getFullYear() || new Date().getFullYear();

  return firstYear;
}
