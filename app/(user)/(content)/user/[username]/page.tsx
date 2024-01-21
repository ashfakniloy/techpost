import { Suspense } from "react";
import { Metadata } from "next";
import UserTopSection from "./UserTopSection";
import BackButton from "@/components/BackButton";
import { getProfileByUsername } from "@/db/queries/getProfileByUsername";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { notFound } from "next/navigation";
import UserPostsSection from "./UserPostsSection";
import { getAllUsersPath } from "@/db/queries/getAllUsersPath";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type UserPageProps = SearchParams & {
  params: {
    username: string;
  };
};

export async function generateStaticParams() {
  const { usersPath } = await getAllUsersPath();

  return usersPath;
}

export async function generateMetadata({
  params: { username },
}: UserPageProps): Promise<Metadata> {
  const usernameDecoded = decodeURIComponent(username);

  const { data: profile } = await getProfileByUsername({
    username: usernameDecoded,
  });

  if (!profile) {
    return {
      title: "Profile not found",
    };
  }

  const usernameCapitalized = capitalizeWords(profile.user.username);

  return {
    title: usernameCapitalized,
    openGraph: {
      images: {
        url: profile?.imageUrl || "/images/blankUser.jpg",
        width: 1200,
        height: 630,
        alt: profile.user.username,
      },
      type: "profile",
    },
    description: `Read latest articles from ${usernameCapitalized} at TechPost`,
  };
}

async function UserPage({ params: { username }, searchParams }: UserPageProps) {
  const usernameDecoded = decodeURIComponent(username);

  const { data: profile } = await getProfileByUsername({
    username: usernameDecoded,
  });

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <div className="mb-10">
        <BackButton />
      </div>

      <UserTopSection
        username={profile.user.username}
        createdAt={profile.createdAt}
        bio={profile?.bio}
        imageUrl={profile.imageUrl}
        facebook={profile.facebook}
        twitter={profile.twitter}
        linkedin={profile.linkedin}
      />

      <Suspense fallback={null}>
        <UserPostsSection
          // limit={limit}
          // page={page}
          // sort={sort}
          searchParams={searchParams}
          usernameDecoded={usernameDecoded}
        />
      </Suspense>
    </div>
  );
}

export default UserPage;

// import { Suspense } from "react";
// import { Metadata } from "next";
// import PostsView from "@/components/Post/PostsView";
// import UserTopSection from "./UserTopSection";
// import UserSideSection from "./UserSideSection";
// import PostsHeader from "@/components/Post/PostsHeader";
// import BackButton from "@/components/BackButton";
// import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
// import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
// import ProfileTopSkeleton from "@/components/Skeleton/ProfileTopSkeleton";
// import { getPostsByUsername } from "@/db/queries/getPostsByUsername";
// import { getProfileByUsername } from "@/db/queries/getProfileByUsername";
// import { capitalizeWords } from "@/utils/capitalizeWords";

// // export const revalidate = 0;
// // export const dynamic = "force-dynamic";
// // export const fetchCache = "force-no-store";

// type UserPageProps = SearchParams & {
//   params: {
//     username: string;
//   };
// };

// export async function generateMetadata({
//   params: { username },
// }: UserPageProps): Promise<Metadata> {
//   const usernameDecoded = decodeURIComponent(username);

//   const { data: profile } = await getProfileByUsername({
//     username: usernameDecoded,
//   });

//   if (!profile) {
//     return {
//       title: "Profile not found",
//     };
//   }

//   const usernameCapitalized = capitalizeWords(profile.user.username);

//   return {
//     title: usernameCapitalized,
//     openGraph: {
//       images: {
//         url: profile?.imageUrl || "/images/blankUser.jpg",
//         width: 1200,
//         height: 630,
//         alt: profile.user.username,
//       },
//       type: "profile",
//     },
//     description: `Read latest articles from ${usernameCapitalized} at TechPost`,
//   };
// }

// async function UserPosts({
//   username,
//   limitNumber,
//   pageNumber,
//   sort,
// }: {
//   username: string;
//   limitNumber: number;
//   pageNumber: number;
//   sort: string;
// }) {
//   const { data, count } = await getPostsByUsername({
//     username,
//     limitNumber,
//     pageNumber,
//     sort,
//   });

//   if (!data) {
//     return (
//       <p className="mt-20 text-xl text-center text-red-500">No posts found</p>
//     );
//   }

//   return <PostsView posts={data} postCount={count} limit={limitNumber} />;
// }

// function UserPage({
//   params: { username },
//   searchParams: { page, limit, sort },
// }: UserPageProps) {
//   const usernameDecoded = decodeURIComponent(username);
//   const pageNumber = Number(page);
//   const limitNumber = Number(limit);

//   const cardTitle = () => {
//     if (!sort || sort === "recent") return `Popular from ${usernameDecoded}`;
//     if (sort === "popular") return `Recent from ${usernameDecoded}`;
//     return `Popular from ${usernameDecoded}`;
//   };

//   const getPostsTitle = () => {
//     if (!sort || sort === "recent")
//       return `Recent Posts from ${usernameDecoded}`;
//     if (sort === "popular") return `Popular Posts from ${usernameDecoded}`;
//     return "invalid";
//   };

//   const postsTitle = getPostsTitle();

//   return (
//     <div>
//       <div className="mb-10">
//         <BackButton />
//       </div>

//       <Suspense fallback={<ProfileTopSkeleton />}>
//         <UserTopSection username={usernameDecoded} />
//       </Suspense>

//       <div className="lg:flex items-start justify-between gap-5 mt-10 lg:mt-20">
//         <section className="lg:flex-1 lg:max-w-[796px]">
//           <PostsHeader postsTitle={postsTitle} />

//           {postsTitle === "invalid" ? (
//             <p className="mt-20 text-xl text-center text-red-500">
//               Invalid sort parameter
//             </p>
//           ) : (
//             <Suspense key={page || sort} fallback={<PostsSkeleton />}>
//               <UserPosts
//                 username={usernameDecoded}
//                 limitNumber={limitNumber}
//                 pageNumber={pageNumber}
//                 sort={sort}
//               />
//             </Suspense>
//           )}
//         </section>

//         <div className="hidden lg:flex flex-col gap-5 lg:sticky top-[90px]">
//           <Suspense
//             key={sort}
//             fallback={<PostsCardSkeleton heading={cardTitle()} />}
//           >
//             <UserSideSection
//               cardTitle={cardTitle()}
//               username={usernameDecoded}
//               sort={sort}
//             />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserPage;
