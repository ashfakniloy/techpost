import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getSinglePostAdmin({ postId }: { postId: string }) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
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

      // commentsReplies: {
      //   include: {
      //     user: {
      //       select: {
      //         username: true,
      //         id: true,
      //         profile: {
      //           select: {
      //             imageUrl: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      // },

      likes: {
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
      },

      // comments: {
      //   include: {
      //     user: {
      //       select: {
      //         id: true,
      //         profile: {
      //           select: {
      //             imageUrl: true,
      //           },
      //         },
      //       },
      //     },

      //     commentsLikes: {
      //       include: {
      //         user: {
      //           select: {
      //             id: true,
      //             profile: {
      //               select: {
      //                 imageUrl: true,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },

      //     commentsReplies: {
      //       select: {
      //         user: {
      //           select: {
      //             id: true,
      //             profile: {
      //               select: {
      //                 imageUrl: true,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // },

      _count: {
        select: {
          views: true,
          comments: true,
          commentsReplies: true,
          likes: true,
        },
      },
    },
  });

  return { data };
}

// export type PostAdminTypes = Prisma.PromiseReturnType<
//   typeof getSinglePostAdmin
// >['data']['likes'];
