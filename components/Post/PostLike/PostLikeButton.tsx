// with route handler
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useToggle from "@/hooks/useToggle";
import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { getPluralize } from "@/utils/getPluralize";

function PostLikeButton({
  postId,
  likesCount,
  session,
  hasLiked,
  children,
}: {
  postId?: string;
  commentId?: string;
  likesCount: number;
  session: Session | null;
  hasLiked: boolean | undefined;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [like, setLike] = useState(hasLiked);

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  useEffect(() => {
    hasLiked && setLike(true);

    return () => setLike(false);
  }, [hasLiked]);

  const url = `/api/post/like?postId=${postId}`;

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
        // router.refresh();
        revalidateTagAction("counts");
      } else {
        await handleLike();
        revalidateTagAction("counts");

        // router.refresh();
      }
    } else {
      router.push(`/signin?callback_url=${pathname}`);
    }
  };

  return (
    <div ref={node} className="relative flex items-center text-sm lg:text-base">
      <button
        className={`font-bold active:scale-125 h-6 w-6 ${
          like ? "text-blue-500" : "text-emerald-400"
        }`}
        onClick={handleClick}
      >
        <HandThumbUpIcon />
      </button>

      {likesCount > 0 && (
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
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostLikeButton;

//with server actions
// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import type { Session } from "next-auth";
// import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import useToggle from "@/hooks/useToggle";
// import { likeAction, unlikeAction } from "./likeAction";

// function PostLikeButton({
//   postId,
//   likesCount,
//   session,
//   hasLiked,
//   children,
// }: {
//   postId?: string;
//   commentId?: string;
//   likesCount: number;
//   session: Session | null;
//   hasLiked: boolean | undefined;
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [like, setLike] = useState(hasLiked);

//   const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

//   useEffect(() => {
//     hasLiked && setLike(true);

//     return () => setLike(false);
//   }, [hasLiked]);

//   const handleLike = async () => {
//     setLike(true);
//     await likeAction({ postId: postId, session: session });
//   };

//   const handleUnlike = async () => {
//     setLike(false);
//     await unlikeAction({ postId: postId, session: session });
//   };

//   const handleClick = async () => {
//     if (session && session.user.role === "USER") {
//       if (hasLiked) {
//         await handleUnlike();
//       } else {
//         await handleLike();
//       }
//     } else {
//       // router.push("/signin");
//       router.push(`/signin?callback_url=${pathname}`);
//     }
//   };

//   return (
//     <div ref={node} className="relative flex items-center text-xs lg:text-sm">
//       {/* {session && ( */}
//       <button
//         type="button"
//         aria-label={like ? "dislike" : "like"}
//         className={`font-bold active:scale-125 h-6 w-6 ${
//           like ? "text-blue-500" : "text-emerald-400"
//         } ${likesCount > 0 ? "mr-2" : "mr-2 lg:mr-4"}`}
//         onClick={handleClick}
//       >
//         <HandThumbUpIcon />
//       </button>
//       {/* )} */}

//       {likesCount > 0 && (
//         <div>
//           <button
//             className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
//             onClick={() => setShowLikes(!showLikes)}
//           >
//             <span>{likesCount}</span>
//             {/* <span>{getPluralize(likesCount, "Like", "s")}</span> */}
//           </button>

//           {showLikes && (
//             <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
//               <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
//                 <p className="self-center ">All Likes</p>
//                 <button
//                   className="w-6 h-6 p-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-600/50 dark:hover:bg-gray-600"
//                   onClick={() => setShowLikes(false)}
//                 >
//                   <XMarkIcon />
//                 </button>
//               </div>
//               {children}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PostLikeButton;
