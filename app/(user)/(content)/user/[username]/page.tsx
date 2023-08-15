import PostsView from "@/components/Post/PostsView";
import ProfileTopSection from "./ProfileTopSection";
import ProfileSideSection from "./ProfileSideSection";
import { getPostsByUsername } from "@/prisma/find/getPostsByUsername";
import PostsHeader from "@/components/Post/PostsHeader";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import { Suspense } from "react";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import BackButton from "@/components/BackButton";
import ProfileTopSkeleton from "@/components/Skeleton/ProfileTopSkeleton";
import { Metadata } from "next";
import { getProfileByUsername } from "@/prisma/find/getProfileByUsername";
import { capitalizeWords } from "@/utils/capitalizeWords";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type Props = SearchParams & {
  params: {
    username: string;
  };
};

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const usernameDecoded = decodeURIComponent(username);

  const { data: profile } = await getProfileByUsername({
    username: usernameDecoded,
  });

  if (!profile) {
    return {
      title: "Profile not found",
    };
  }

  return {
    title: capitalizeWords(profile.user.username),
    openGraph: {
      images: {
        url: profile?.imageUrl || "/images/blankUser.jpg",
        width: 1200,
        height: 630,
        alt: profile.user.username,
      },
      type: "profile",
    },
  };
}

async function UserPosts({
  username,
  limitNumber,
  pageNumber,
  sort,
}: {
  username: string;
  limitNumber: number;
  pageNumber: number;
  sort: string;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 7000));

  const { data, count } = await getPostsByUsername({
    username,
    limitNumber,
    pageNumber,
    sort,
  });

  if (!data) {
    return (
      <p className="mt-20 text-xl text-center text-red-500">No posts found</p>
    );
  }

  return <PostsView posts={data} postCount={count} limit={limitNumber} />;
}

function UserPage({
  params: { username },
  searchParams: { page, limit, sort },
}: Props) {
  const usernameDecoded = decodeURIComponent(username);
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const cardTitle = () => {
    if (!sort || sort === "recent") return `Popular from ${username}`;
    if (sort === "popular") return `Recent from ${username}`;
    return `Popular from ${username}`;
  };

  const getPostsTitle = () => {
    if (!sort || sort === "recent")
      return `Recent Posts from ${usernameDecoded}`;
    if (sort === "popular") return `Popular Posts from ${usernameDecoded}`;
    return "invalid";
  };

  const postsTitle = getPostsTitle();

  return (
    <div>
      <div className="mb-10">
        <BackButton />
      </div>

      <Suspense fallback={<ProfileTopSkeleton />}>
        <ProfileTopSection username={usernameDecoded} />
      </Suspense>

      <div className="lg:flex items-start justify-between gap-5 mt-10 lg:mt-20">
        <div className="lg:flex-1 lg:max-w-[796px] overflow-hidden">
          <PostsHeader postsTitle={postsTitle} />

          {postsTitle === "invalid" ? (
            <p className="mt-20 text-xl text-center text-red-500">
              Invalid sort parameter
            </p>
          ) : (
            <Suspense key={page || sort} fallback={<PostsSkeleton />}>
              <UserPosts
                username={usernameDecoded}
                limitNumber={limitNumber}
                pageNumber={pageNumber}
                sort={sort}
              />
            </Suspense>
          )}
        </div>

        <div className="hidden lg:flex flex-col gap-5 lg:sticky top-[97px]">
          <Suspense
            key={sort}
            fallback={<PostsCardSkeleton heading={cardTitle()} />}
          >
            <ProfileSideSection
              cardTitle={cardTitle()}
              username={usernameDecoded}
              sort={sort}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
