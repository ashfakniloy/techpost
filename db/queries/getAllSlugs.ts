import { prisma } from "@/lib/prisma";

export async function getAllSlugs() {
  const slugs = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });

  return { slugs };
}
