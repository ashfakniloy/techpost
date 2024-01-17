"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import toast from "react-hot-toast";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@/components/ui/skeleton";
import useToggle from "@/hooks/useToggle";
import { getPluralize } from "@/utils/getPluralize";
import { likeAction } from "@/db/mutations/user/post/likeAction";

function PostLike({
  session,
  postId,
  likesCount,
  likesData,
  hasLiked,
}: {
  session: Session | null;
  postId: string;
  likesCount: number;
  likesData: any;
  hasLiked: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isUser = session?.user.role === "USER";

  const [like, setLike] = useState(hasLiked);
  const [isPending, startTransition] = useTransition();

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  // // with server action
  const handleClick = () => {
    if (!isUser) {
      router.push(`/signin?callback_url=${pathname}`);
      return;
    }

    setLike((prev) => !prev);

    startTransition(async () => {
      const result = await likeAction({ postId, hasLiked });

      if (result.error) {
        setLike((prev) => !prev);
        toast.error(result.error);
      }
    });
  };

  return (
    <div ref={node} className="relative flex items-center text-sm lg:text-base">
      <button
        type="button"
        className={`font-bold active:scale-125 h-6 w-6 disabled:opacity-50 disabled:pointer-events-none ${
          like ? "text-blue-500" : "text-emerald-400"
        }`}
        onClick={handleClick}
        disabled={isPending}
      >
        <HandThumbUpIcon />
      </button>

      <div className="min-w-[62px]">
        {isPending ? (
          <Skeleton className="ml-2 h-6 w-full" />
        ) : (
          likesCount > 0 && (
            <div>
              <button
                className="ml-2 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
                onClick={() => setShowLikes(!showLikes)}
              >
                <span>
                  {getPluralize({
                    count: likesCount,
                    name: "Like",
                    plural: "Likes",
                  })}
                </span>
              </button>

              {showLikes && (
                <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
                  <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
                    <p className="self-center">All Likes</p>
                    <button
                      className="w-6 h-6 p-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-600/50 dark:hover:bg-gray-600"
                      onClick={() => setShowLikes(false)}
                    >
                      <XMarkIcon />
                    </button>
                  </div>
                  <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
                    {likesData?.map((like: any) => (
                      <Link key={like.id} href={`/user/${like.user.username}`}>
                        <div
                          className={`w-full flex items-center gap-2 px-2 py-1.5 lg:p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            like.userId === session?.user.id
                              ? "text-blue-400"
                              : ""
                          }`}
                        >
                          <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden">
                            {like.user.profile?.imageUrl ? (
                              <Image
                                src={like.user.profile.imageUrl}
                                alt="user image"
                                fill
                                sizes="30px"
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src="/images/blankUser.jpg"
                                alt="user image"
                                width={30}
                                height={30}
                                className="rounded-full"
                              />
                            )}
                          </div>
                          <span className="capitalize">
                            {like.user.username}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PostLike;
