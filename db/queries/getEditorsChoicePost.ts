import { prisma } from "@/lib/prisma";

export async function getEditorsChoicePost() {
  try {
    const data = await prisma.post.findFirst({
      where: {
        editorsChoice: true,
      },

      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        imageUrl: true,
        imageId: true,
        categoryName: true,
        createdAt: true,
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

      // include: {
      //   user: {
      //     select: {
      //       username: true,
      //       id: true,
      //       profile: {
      //         select: {
      //           imageUrl: true,
      //         },
      //       },
      //     },
      //   },

      //   _count: {
      //     select: {
      //       likes: true,
      //       comments: true,
      //       views: true,
      //     },
      //   },
      // },
    });

    return { data };
  } catch (error) {
    console.log("fetch error:", error);
    throw new Error("Failed to fetch");
  }
}
