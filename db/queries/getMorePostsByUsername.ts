import { prisma } from "@/lib/prisma";

export async function getMorePostsByUsername({
  username,
  limit,
}: {
  username: string;
  limit?: number;
}) {
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      take: limit,
    });

    return { data };
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
