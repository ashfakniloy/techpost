import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/config";
import parser from "html-react-parser";
import { EyeIcon } from "@heroicons/react/24/solid";
import UsersMorePosts from "./UsersMorePosts";
import RelatedPosts from "./RelatedPosts";
import Comment from "@/components/Post/Comment";
import OptionButton from "@/components/Post/OptionButton";
import PostLike from "@/components/Post/PostLike";
import ViewCount from "@/components/Post/ViewCount";
import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";
import SocialShare from "@/components/Post/SocialShare";
import { getDescription } from "@/utils/getDescription";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getSinglePost } from "@/db/queries/getSinglePost";
import { getAuthSession } from "@/lib/next-auth";
import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
import "@/components/TextEditor/Tiptap/styles.css";
// import { getAllSlugs } from "@/db/queries/getAllSlugs";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type SinglePostPageProps = {
  params: {
    category: string;
    slug: string;
  };
  searchParams: {
    showComments: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: SinglePostPageProps): Promise<Metadata> {
  const { data: post } = await getSinglePost({
    slug,
  });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const usernameCapitalized = capitalizeWords(post.user.username);

  const description = getDescription(post.article, 100, 160);

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: `/post/${post.id}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: description,
      images: {
        url: post.imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
      authors: usernameCapitalized,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: {
        url: post.imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
      creator: usernameCapitalized,
      site: "@techpost",
    },
  };
}

// export async function generateStaticParams() {
//   const { slugs } = await getAllSlugs();

//   return slugs;
// }

async function SinglePostPage({
  params: { slug },
  searchParams: { showComments },
}: SinglePostPageProps) {
  const session = await getAuthSession();

  const { data: post } = await getSinglePost({ slug });

  if (!post) {
    notFound();
  }

  const articleUrl = `${BASE_URL}/post/${post.id}`;

  const blurDataUrl = await getImagePlaceholder(post.imageUrl);

  return (
    <>
      <div className="flex justify-between gap-5">
        <div className="relative flex-1 max-w-full lg:max-w-[796px]">
          <div className="overflow-hidden">
            <div className="mt-1.5 mb-4 flex justify-between items-center">
              <div className=" text-gray-700 dark:text-gray-300 ">
                <Link
                  href={`/category/${post.categoryName}`}
                  className="capitalize text-sm lg:text-base link"
                >
                  {post.categoryName}
                </Link>
              </div>

              {post.editorsChoice && (
                <div className="absolute right-2">
                  <EditorsChoiceBadge />
                </div>
              )}
            </div>
            <article className="">
              <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat">
                  {post.title}
                </h1>

                <div className="ml-2 lg:ml-0 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-10 mt-3 lg:mt-5">
                    <div className="flex items-center gap-3  lg:gap-6 ">
                      <div className="flex items-center gap-2">
                        <div className="">
                          {post.user.profile?.imageUrl ? (
                            <Image
                              src={post.user.profile.imageUrl}
                              alt="user image"
                              width={35}
                              height={35}
                              className="rounded-full"
                            />
                          ) : (
                            <Image
                              src="/images/blankUser.jpg"
                              alt="user image"
                              width={35}
                              height={35}
                              className="rounded-full"
                            />
                          )}
                        </div>

                        <p className="capitalize">
                          By{" "}
                          <Link href={`/user/${post.user.username}`}>
                            <span className="link">{post.user.username}</span>
                          </Link>
                        </p>
                      </div>

                      {session?.user.id === post.user.id && (
                        <OptionButton
                          title={post.title}
                          postId={post.id}
                          slug={post.slug}
                          imageId={post.imageId}
                          redirectAfterDelete={"/"}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0">
                      <p>
                        <span>Published: </span>
                        <ClientFormattedDate date={post.createdAt} />
                      </p>

                      {post.createdAt < post.updatedAt && (
                        <p>
                          <span className="px-4 hidden lg:inline-block">|</span>
                          <span>Updated: </span>
                          <ClientFormattedDate date={post.updatedAt} />
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-10">
                      <SocialShare
                        articleUrl={articleUrl}
                        articleTitle={post.title}
                        // via="TechPost"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 h-[280px] lg:h-[470px] relative">
                <Image
                  src={post.imageUrl}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  alt="post image"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 ProseMirror !border-none !p-0 !max-h-full overflow-hidden">
                {parser(post.article)}
              </div>
            </article>
          </div>

          <div className="flex items-center mt-5 lg:mt-8 font-semibold text-gray-700 dark:text-gray-300">
            <PostLike postId={post.id} />
            {post._count.views > 0 && (
              <div className="flex items-center gap-2 text-xs lg:text-sm">
                <EyeIcon className="w-6 h-6 text-gray-600" />
                <p className="">
                  {post._count.views}
                  {/* {getPluralize(post._count.views, "View", "s")} */}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Comment
              postId={post.id}
              authorId={post.userId}
              slug={post.slug}
              showCommentsParam={showComments}
            />
          </div>
        </div>

        <div className="hidden lg:block space-y-5">
          <Suspense fallback={<PostsCardSkeleton heading="Related Posts" />}>
            <RelatedPosts
              categoryName={post.categoryName}
              currentPostId={post.id}
            />
          </Suspense>

          <div className="sticky top-[90px]">
            <Suspense
              fallback={
                <PostsCardSkeleton
                  heading={`More Posts from ${post.user.username}`}
                />
              }
            >
              <UsersMorePosts
                username={post.user.username}
                currentPostId={post.id}
              />
            </Suspense>
          </div>

          {/* <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
          </Suspense> */}
        </div>
      </div>

      <ViewCount postId={post.id} isAdmin={session?.user.role === "ADMIN"} />
    </>
  );
}

export default SinglePostPage;
