import { prisma } from "@/lib/prisma";

export async function getCategories() {
  const data = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return { data };
}
