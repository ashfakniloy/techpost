import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import "@/components/TextEditor/Tiptap/styles.css";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";

type SinglePostProps =
  | (Post & {
      user: {
        username: string;
        id: string;
        profile: {
          imageUrl: string | null;
        } | null;
      };
      _count: {
        views: number;
      };
    })
  | null;

function SinglePost({
  post,
  blurDataUrl,
}: {
  post: SinglePostProps;
  blurDataUrl: string;
}) {
  if (!post) return;

  return (
    <div className="relative px-3 py-6 lg:px-6 lg:py-6 rounded-lg bg-gray-50 dark:bg-custom-gray6 lg:w-[850px] shadow-md">
      <div className="mt-1.5 mb-4 flex justify-between items-center">
        <div className=" text-gray-700 dark:text-gray-300 ">
          <Link
            href={`/admin/categories/${post.categoryName}`}
            className="capitalize text-sm lg:text-base hover:text-blue-800 dark:hover:text-blue-500"
          >
            {post.categoryName}
          </Link>
        </div>

        {post.editorsChoice && (
          <div className="absolute right-2 lg:right-5">
            <EditorsChoiceBadge />
          </div>
        )}
      </div>

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

                <p className=" ">
                  By{" "}
                  <Link href={`/admin/users/${post.user.username}`}>
                    <span className="hover:text-blue-800 dark:hover:text-blue-500 capitalize">
                      {post.user.username}
                    </span>
                  </Link>
                </p>
              </div>
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="mt-3 lg:mt-6 ProseMirror !border-none !p-0 !max-h-full overflow-hidden">
        {parser(post.article)}
      </div>
    </div>
  );
}

export default SinglePost;
