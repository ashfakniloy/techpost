"use client";

import Image from "next/image";
import Link from "next/link";
import CommentLikeButton from "./CommentLikeButton";
import { getServerSession } from "next-auth";
import { getCommentLikes } from "@/prisma/find/getCommentsLikes";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CommentLike } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import { useEffect, useState } from "react";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";

type CommentsLikes = (CommentLike & {
  user: {
    profile: {
      imageUrl: string | null;
    } | null;
    id: string;
    username: string;
  };
})[];

function CommentLike({
  commentId,
}: // likes,
{
  commentId: string;
  // likes: CommentsLikes;
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<CommentsLikes | null>(null);

  const hasLiked =
    likes?.find((like) => like.userId === session?.user.id) && true;

  const router = useRouter();

  const [like, setLike] = useState(hasLiked);

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  useEffect(() => {
    hasLiked && setLike(true);

    return () => setLike(false);
  }, [hasLiked]);

  const url = `/api/post/comment/commentLike?commentId=${commentId}`;

  useEffect(() => {
    const getLikes = async () => {
      // const res = await getCommentLikes({ commentId });
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (res.ok) {
        setLikes(data.commentLikes);
      } else {
        console.log("error", data);
      }
    };

    getLikes();
  }, [commentId, like]);

  const handleLike = async () => {
    setLike(true);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("liked", data);
    } else {
      setLike(false);

      console.log("like failed", data);
    }
  };

  const handleUnlike = async () => {
    setLike(false);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json(",
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log("unliked", data);
    } else {
      setLike(true);
      console.log("unlike failed", data);
    }
  };

  const handleClick = async () => {
    if (session) {
      if (hasLiked) {
        await handleUnlike();
        router.refresh();
      } else {
        await handleLike();
        router.refresh();
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    <div ref={node} className="flex items-center text-sm relative z-10">
      <button
        className={`mr-2 lg:mr-3 font-bold active:scale-125 h-6 w-6 ${
          like ? "text-blue-500" : "text-emerald-400"
        } `}
        onClick={handleClick}
      >
        <HandThumbUpIcon />
      </button>

      {likes && likes.length > 0 && (
        <div>
          <button
            className="mr-5 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
            onClick={() => setShowLikes(!showLikes)}
          >
            {likes.length}
            {/* {getPluralize(likesCount, "Like", "s")} */}
          </button>

          {showLikes && (
            <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
              <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
                <p className="self-center ">Comment Likes</p>
                <button
                  className="w-6 h-6 p-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-600/50 dark:hover:bg-gray-600"
                  onClick={() => setShowLikes(false)}
                >
                  <XMarkIcon />
                </button>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
                {likes?.map((like) => (
                  <Link key={like.id} href={`/user/${like.user.username}`}>
                    <div
                      className={`w-full flex items-center gap-2 p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        like.userId === session?.user.id ? "text-blue-400" : ""
                      }`}
                    >
                      {like.user.profile?.imageUrl ? (
                        <Image
                          src={like.user.profile.imageUrl}
                          alt="user image"
                          width={30}
                          height={30}
                          className="rounded-full"
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
                      {like.user.username}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    // <CommentLikeButton
    //   commentId={commentId}
    //   hasLiked={hasLiked}
    //   session={session}
    //   likesCount={likes.length}
    // >
    //   <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
    //     {likes?.map((like) => (
    //       <Link key={like.id} href={`/user/${like.user.username}`}>
    //         <div
    //           className={`w-full flex items-center gap-2 p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
    //             like.userId === session?.user.id ? "text-blue-400" : ""
    //           }`}
    //         >
    //           {like.user.profile?.imageUrl ? (
    //             <Image
    //               src={like.user.profile.imageUrl}
    //               alt="user image"
    //               width={30}
    //               height={30}
    //               className="rounded-full"
    //             />
    //           ) : (
    //             <Image
    //               src="/images/blankUser.jpg"
    //               alt="user image"
    //               width={30}
    //               height={30}
    //               className="rounded-full"
    //             />
    //           )}
    //           {like.user.username}
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </CommentLikeButton>
  );
}

export default CommentLike;

// import Image from "next/image";
// import Link from "next/link";
// import CommentLikeButton from "./CommentLikeButton";
// import { getServerSession } from "next-auth";
// import { getCommentLikes } from "@/prisma/find/getCommentsLikes";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { CommentLike } from "@prisma/client";

//  type CommentsLikes = (CommentLike & {
//   user: {
//     profile: {
//       imageUrl: string | null;
//     } | null;
//     id: string;
//     username: string;
//   };
// })[];

// async function CommentLike({ commentId, likes }: { commentId: string, likes: CommentsLikes }) {
//   const { data: commentsLikes, count: commentLikesCount } =
//     await getCommentLikes({ commentId });

//   const session = await getServerSession(authOptions);

//   const hasLiked =
//     commentsLikes?.find((like) => like.userId === session?.user.id) && true;

//   return (
//     <CommentLikeButton
//       commentId={commentId}
//       hasLiked={hasLiked}
//       session={session}
//       likesCount={commentLikesCount}
//     >z
//       <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
//         {commentsLikes?.map((like) => (
//           <Link key={like.id} href={`/user/${like.user.username}`}>
//             <div
//               className={`w-full flex items-center gap-2 p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
//                 like.userId === session?.user.id ? "text-blue-400" : ""
//               }`}
//             >
//               {like.user.profile?.imageUrl ? (
//                 <Image
//                   src={like.user.profile.imageUrl}
//                   alt="user image"
//                   width={30}
//                   height={30}
//                   className="rounded-full"
//                 />
//               ) : (
//                 <Image
//                   src="/images/blankUser.jpg"
//                   alt="user image"
//                   width={30}
//                   height={30}
//                   className="rounded-full"
//                 />
//               )}
//               {like.user.username}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </CommentLikeButton>
//   );
// }

// export default CommentLike;
