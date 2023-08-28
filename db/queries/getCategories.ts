import { prisma } from "@/lib/prisma";

export async function getCategories() {
  try {
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
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
