import { Post, Profile, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import "@/components/TextEditor/Tiptap/styles.css";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

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
// & GetResult<{
// id: string;
// title: string;
// imageUrl: string;
// ... 5 more ...;
// userId: string;
// }, unknown> & {}) | null;

// };

function SinglePost({ post }: { post: SinglePostProps }) {
  if (!post) return;

  return (
    <div className="p-6 rounded-lg bg-custom-gray6 w-[850px]">
      <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 lg:gap-6 mt-2 lg:mt-5">
          <div className="flex items-center gap-3 text-xs lg:text-sm lg:gap-6 text-gray-500 dark:text-gray-400">
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

              <p className=" ">
                By{" "}
                <Link href={`/user/${post.user.username}`}>
                  <span className=" hover:text-blue-800 dark:hover:text-blue-500">
                    {post.user.username}
                  </span>
                </Link>
              </p>
            </div>
            <p>
              <ClientFormattedDate date={post.createdAt} />
            </p>
          </div>
          {/* {session?.user.id === post.user.id && (
                    <OptionButton
                      title={post.title}
                      postId={post.id}
                      imageId={post.imageId}
                      redirectAfterDelete={"/"}
                    />
                  )} */}
        </div>
      </div>

      <div className="mt-5 h-[280px] lg:h-[470px] relative">
        <Image
          src={post.imageUrl}
          alt="image"
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
