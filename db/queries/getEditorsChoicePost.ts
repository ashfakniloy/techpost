import { prisma } from "@/lib/prisma";

export async function getEditorsChoicePost() {
  try {
    const data = await prisma.post.findFirst({
      where: {
        editorsChoice: true,
      },

      include: {
        user: {
          select: {
            username: true,
            id: true,
            profile: {
              select: {
                imageUrl: true,
              },
            },
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
            views: true,
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
