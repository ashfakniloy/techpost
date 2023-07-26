import { prisma } from "@/lib/prisma";

export async function getViewCountPerDay() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based, so add 1 to get the current month

  const result = await prisma.view.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // First day of the current month
        lt: new Date(currentDate.getFullYear(), currentMonth, 1), // First day of the next month
      },
    },
    _count: {
      createdAt: true,
    },
  });

  const postsViewPerDate: { date: Date; count: number }[] = result.map(
    (entry) => ({
      date: entry.createdAt,
      count: entry._count.createdAt,
    })
  );

  return { postsViewPerDate };
}
