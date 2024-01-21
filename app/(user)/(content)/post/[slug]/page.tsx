import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import parser from "html-react-parser";
import { BASE_URL } from "@/config";
import Counts from "./Counts";
import Comment from "@/components/Post/Comment";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";
import SocialShare from "@/components/Post/SocialShare";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getSinglePost } from "@/db/queries/getSinglePost";
import CountsSkeleton from "@/components/Skeleton/CountsSkeleton";
import "@/components/TextEditor/Tiptap/styles.css";
import { getAllSlugs } from "@/db/queries/getAllSlugs";
import PostOption from "./PostOption";

// import { getImagePlaceholder } from "@/utils/getImagePlaceholder";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

// export const dynamicParams = false;

// export const dynamic = "force-static";

type SinglePostPageProps = {
  params: {
    category: string;
    slug: string;
  };
  searchParams: {
    showComments: string;
  };
};

export async function generateStaticParams() {
  const { slugs } = await getAllSlugs();

  return slugs;
}

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

  return {
    title: post.title,
    description: post.shortDescription,
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.shortDescription,
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
      description: post.shortDescription,
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

async function SinglePostPage({
  params: { slug },
  searchParams,
}: SinglePostPageProps) {
  const { data: post } = await getSinglePost({ slug });

  if (!post) {
    notFound();
  }

  const articleUrl = `${BASE_URL}/post/${slug}`;

  // const blurDataURL = await getImagePlaceholder(post.imageUrl);

  const blurDataURL = post.imageUrl.replace(
    "/upload/",
    "/upload/w_10/e_blur:100,q_100/"
  );

  // console.log("blurdataurl", blurDataURL);

  return (
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

        <article>
          <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat">
              {post.title}
            </h1>

            <div className="ml-2 lg:ml-0 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-10 mt-3 lg:mt-5">
                <div className="flex items-center gap-3  lg:gap-6 ">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                      {post.user.profile?.imageUrl ? (
                        <Image
                          src={post.user.profile.imageUrl}
                          alt="user image"
                          fill
                          sizes="35px"
                          className="object-cover"
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

                  <Suspense fallback={null}>
                    <PostOption
                      title={post.title}
                      slug={post.slug}
                      postId={post.id}
                      userId={post.userId}
                    />
                  </Suspense>
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
              blurDataURL={blurDataURL}
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

      <div className="mt-10 mx-auto border-b-2 border-gray-300 dark:border-gray-700"></div>

      <div className="mt-5 lg:mt-8">
        <Suspense fallback={<CountsSkeleton />}>
          <Counts postId={post.id} />
        </Suspense>
      </div>

      <div className="mt-5">
        <Suspense fallback={<p>Loading...</p>}>
          <Comment
            postId={post.id}
            authorId={post.userId}
            slug={post.slug}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SinglePostPage;
