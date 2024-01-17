"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import toast from "react-hot-toast";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@/components/ui/skeleton";
import useToggle from "@/hooks/useToggle";
import { commentLikeAction } from "@/db/mutations/user/post/commentLikeAction";

function CommentLikeButton({
  commentId,
  likesCount,
  session,
  hasLiked,
  children,
}: {
  commentId: string;
  likesCount: number;
  session: Session | null;
  hasLiked: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isUser = session?.user.role === "USER";

  const [like, setLike] = useState(hasLiked);
  const [isPending, startTransition] = useTransition();

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  // with server action
  const handleClick = () => {
    if (!isUser) {
      router.push(`/signin?callback_url=${pathname}`);
      return;
    }

    setLike((prev) => !prev);

    startTransition(async () => {
      const result = await commentLikeAction({ commentId, hasLiked });

      if (result.error) {
        setLike((prev) => !prev);
        toast.error(result.error);
      }
    });
  };

  return (
    <div ref={node} className="flex items-center text-sm relative">
      <button
        type="button"
        aria-label={like ? "dislike" : "like"}
        className={`mr-2 lg:mr-3 font-bold active:scale-125 h-6 w-6 disabled:opacity-50 disabled:pointer-events-none ${
          like ? "text-blue-500" : "text-emerald-400"
        }`}
        onClick={handleClick}
        disabled={isPending}
      >
        <HandThumbUpIcon />
      </button>

      <div className="min-w-[25px]">
        {isPending ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          likesCount > 0 && (
            <div>
              <button
                type="button"
                aria-label="all likes"
                className="mr-5 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
                onClick={() => setShowLikes(!showLikes)}
              >
                {likesCount}
              </button>

              {showLikes && (
                <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
                  <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
                    <p className="self-center ">Comment Likes</p>
                    <button
                      type="button"
                      aria-label="close"
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
          )
        )}
      </div>
    </div>
  );
}

export default CommentLikeButton;

// // with route handler
// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import type { Session } from "next-auth";
// import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import useToggle from "@/hooks/useToggle";

// function CommentLikeButton({
//   commentId,
//   likesCount,
//   session,
//   hasLiked,
//   children,
// }: {
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

//   const url = `/api/post/comment/commentLike?commentId=${commentId}`;

//   const handleLike = async () => {
//     setLike(true);

//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();

//     if (res.ok) {
//       console.log("liked", data);
//     } else {
//       setLike(false);

//       console.log("like failed", data);
//     }
//   };

//   const handleUnlike = async () => {
//     setLike(false);

//     const res = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json(",
//       },
//     });

//     const data = await res.json();

//     if (res.ok) {
//       console.log("unliked", data);
//     } else {
//       setLike(true);
//       console.log("unlike failed", data);
//     }
//   };

//   const handleClick = async () => {
//     if (session && session.user.role === "USER") {
//       if (hasLiked) {
//         await handleUnlike();
//         router.refresh();
//       } else {
//         await handleLike();
//         router.refresh();
//       }
//     } else {
//       router.push(`/signin?callback_url=${pathname}`);
//     }
//   };

//   return (
//     <div ref={node} className="flex items-center text-sm relative">
//       <button
//         type="button"
//         aria-label={like ? "dislike" : "like"}
//         className={`mr-2 lg:mr-3 font-bold active:scale-125 h-6 w-6 ${
//           like ? "text-blue-500" : "text-emerald-400"
//         } `}
//         onClick={handleClick}
//       >
//         <HandThumbUpIcon />
//       </button>

//       {likesCount > 0 && (
//         <div>
//           <button
//             type="button"
//             aria-label="all likes"
//             className="mr-5 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
//             onClick={() => setShowLikes(!showLikes)}
//           >
//             {likesCount}
//           </button>

//           {showLikes && (
//             <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
//               <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
//                 <p className="self-center ">Comment Likes</p>
//                 <button
//                   type="button"
//                   aria-label="close"
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

// export default CommentLikeButton;
