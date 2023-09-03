import { prisma } from "@/lib/prisma";

export async function getSinglePost({ slug }: { slug: string }) {
  const decodedSlug = decodeURIComponent(slug);

  const data = await prisma.post.findUnique({
    where: {
      slug: decodedSlug,
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
          views: true,
        },
      },
    },
  });

  return { data };
}

// import { prisma } from "@/lib/prisma";

// export async function getSinglePost({ slug }: { slug: string }) {
//   const decodedSlug = decodeURIComponent(slug);

//   const data = await prisma.post.findUnique({
//     where: {
//       slug: decodedSlug,
//     },

//     include: {
//       user: {
//         select: {
//           username: true,
//           id: true,
//           profile: {
//             select: {
//               imageUrl: true,
//             },
//           },
//         },
//       },

//       _count: {
//         select: {
//           views: true,
//         },
//       },
//     },
//   });

//   return { data };
// }
