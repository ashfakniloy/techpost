import { prisma } from "@/lib/prisma";

export async function getCounts() {
  const usersCount = await prisma.user.count();
  const postsCount = await prisma.post.count();
  const viewsCount = await prisma.view.count();
  const categoriesCount = await prisma.category.count();

  return {
    usersCount,
    postsCount,
    viewsCount,
    categoriesCount,
  };
}
