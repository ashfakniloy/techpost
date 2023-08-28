import { prisma } from "@/lib/prisma";

export async function getCommentLikes({ commentId }: { commentId: string }) {
  try {
    const count = await prisma.commentLike.count({
      where: {
        commentId: commentId,
      },
    });

    const data = await prisma.commentLike.findMany({
      where: {
        commentId: commentId,
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
      },
    });

    return { data, count };
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
