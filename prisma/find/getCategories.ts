import { prisma } from "@/lib/prisma";

export async function getCategories() {
  const data = await prisma.category.findMany({
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
