import { prisma } from "@/lib/prisma";

export async function getViewCountPerDay() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based, so add 1 to get the current month

  // const result = await prisma.view.groupBy({
  //   by: ["createdAt"],
  //   where: {
  //     createdAt: {
  //       gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // First day of the current month
  //       lt: new Date(currentDate.getFullYear(), currentMonth, 1), // First day of the next month
  //     },
  //   },
  //   _count: {
  //     createdAt: true,
  //   },
  // });

  const year = 2023; // Replace with the dynamic year
  // const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  // const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);

  const startDate = new Date(0);
  startDate.setFullYear(year);
  const endDate = new Date(0);
  endDate.setFullYear(year + 1);

  const result = await prisma.post.groupBy({
    by: ["createdAt"],
    // where: {
    //   createdAt: {
    //     gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // First day of the current month
    //     lt: new Date(currentDate.getFullYear(), currentMonth, 1), // First day of the next month
    //   },
    // },
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },

    _count: true,
  });

  console.log("result", result);

  const postsPermonth = result.reduce(
    (acc, { createdAt, _count }) => {
      const month = createdAt.getMonth();
      acc[month].total += _count;
      return acc;
    },
    [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ]
  );

  // const postsViewPerDate: { date: Date; count: number }[] = result.map(
  //   (entry) => ({
  //     date: entry,
  //     count: entry,
  //   })
  // );

  // const postsViewPerDate: { date: Date; count: number }[] = result.map(
  //   (entry) => ({
  //     date: entry.createdAt.getMonth() + 1,
  //     count: entry._count.createdAt,
  //   })
  // );

  return { postsPermonth };
}
