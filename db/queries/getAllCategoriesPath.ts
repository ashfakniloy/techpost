import { prisma } from "@/lib/prisma";

export async function getAllCategoriesPath() {
  const categoriesName = await prisma.category.findMany({
    select: {
      name: true,
    },
  });

  const categoriesPath = categoriesName.map((category) => {
    return {
      categoryName: category.name.replace(" ", "%20").toLowerCase(),
    };
  });

  return { categoriesPath };
}
