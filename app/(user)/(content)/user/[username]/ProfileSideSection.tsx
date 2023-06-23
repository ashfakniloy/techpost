import PostsSideSection from "@/components/Post/PostsSideSection";
import { getPostsByUsername } from "@/prisma/find/getPostsByUsername";

async function ProfileSideSection({
  cardTitle,
  username,
  sort,
}: {
  cardTitle: string;
  username: string;
  sort: string;
}) {
  const sortReversed = sort === "popular" ? "recent" : "popular";

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data } = await getPostsByUsername({
    username,
    sort: sortReversed,
    limitNumber: 5,
  });

  return data && <PostsSideSection heading={cardTitle} posts={data} />;
}

export default ProfileSideSection;

// import PostsSideSection from "@/components/Post/PostsSideSection";
// import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
// import { getPostsByUsername } from "@/prisma/find/getPostsByUsename";
// import { Suspense } from "react";

// async function UserPostsCard({
//   username,
//   sort,
//   cardTitle,
// }: {
//   username: string;
//   sort: string;
//   cardTitle: string;
// }) {
//   const sortReversed = sort === "popular" ? "recent" : "popular";

//   await new Promise((resolve) => setTimeout(resolve, 5000));

//   const { data } = await getPostsByUsername({
//     username,
//     sort: sortReversed,
//     limitNumber: 5,
//   });

//   return data && <PostsSideSection heading={cardTitle} posts={data} />;
// }

// async function ProfileSideSection({
//   username,
//   sort,
// }: {
//   username: string;
//   sort: string;
// }) {
//   const cardTitle = () => {
//     if (!sort || sort === "recent") return `Popular from ${username}`;
//     if (sort === "popular") return `Recent from ${username}`;
//     return "";
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <Suspense
//         key={sort}
//         fallback={<PostsCardSkeleton heading={cardTitle()} />}
//       >
//         <UserPostsCard
//           username={username}
//           cardTitle={cardTitle()}
//           sort={sort}
//         />
//       </Suspense>
//     </div>
//   );
// }

// export default ProfileSideSection;
