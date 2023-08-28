import { prisma } from "@/lib/prisma";

export async function getAllSlugs() {
  try {
    const slugs = await prisma.post.findMany({
      select: {
        slug: true,
      },
    });

    return { slugs };
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
