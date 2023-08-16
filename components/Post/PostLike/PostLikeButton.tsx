//with route handler
// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import type { Session } from "next-auth";
// import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import useToggle from "@/hooks/useToggle";
// // import { likeAction, unlikeAction } from "./likeAction";

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

//   const [like, setLike] = useState(hasLiked);

//   const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

//   // const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     hasLiked && setLike(true);

//     return () => setLike(false);
//   }, [hasLiked]);

//   const url = `/api/post/like?postId=${postId}`;

//   const handleLike = async () => {
//     setLike(true);

//     // await likeAction({ postId: postId, session: session });

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

//     // await unlikeAction({ postId: postId, session: session });

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
//     if (session) {
//       if (hasLiked) {
//         await handleUnlike();
//         router.refresh();
//       } else {
//         await handleLike();
//         router.refresh();
//       }
//     } else {
//       router.push("/signin");
//     }
//   };

//   return (
//     <div ref={node} className="relative flex items-center text-xs lg:text-sm">
//       {/* {session && ( */}
//       <button
//         // formAction={handleClick}
//         // type="button"
//         className={`font-bold active:scale-125 h-6 w-6 ${
//           like ? "text-blue-500" : "text-emerald-400"
//         } ${likesCount > 0 ? "mr-2" : "mr-2 lg:mr-4"}`}
//         onClick={handleClick}
//         // onClick={() => startTransition(handleClick)}
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
//             <span className="">{likesCount}</span>
//             {/* <span className="">{getPluralize(likesCount, "Like", "s")}</span> */}
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

//with server actions
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { HandThumbUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useToggle from "@/hooks/useToggle";
import { likeAction, unlikeAction } from "./likeAction";

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

  const [like, setLike] = useState(hasLiked);

  const { node, toggle: showLikes, setToggle: setShowLikes } = useToggle();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    hasLiked && setLike(true);

    return () => setLike(false);
  }, [hasLiked]);

  const handleLike = async () => {
    setLike(true);
    await likeAction({ postId: postId, session: session });
  };

  const handleUnlike = async () => {
    setLike(false);
    await unlikeAction({ postId: postId, session: session });
  };

  const handleClick = async () => {
    if (session && session.user.role === "USER") {
      if (hasLiked) {
        await handleUnlike();
      } else {
        await handleLike();
      }
    } else {
      router.push("/signin");
    }
  };

  return (
    <div ref={node} className="relative flex items-center text-xs lg:text-sm">
      {/* {session && ( */}
      <button
        type="button"
        aria-label={like ? "dislike" : "like"}
        className={`font-bold active:scale-125 h-6 w-6 ${
          like ? "text-blue-500" : "text-emerald-400"
        } ${likesCount > 0 ? "mr-2" : "mr-2 lg:mr-4"}`}
        // onClick={handleClick}
        onClick={() => startTransition(handleClick)}
      >
        <HandThumbUpIcon />
      </button>
      {/* )} */}

      {likesCount > 0 && (
        <div>
          <button
            className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
            onClick={() => setShowLikes(!showLikes)}
          >
            <span className="">{likesCount}</span>
            {/* <span className="">{getPluralize(likesCount, "Like", "s")}</span> */}
          </button>

          {showLikes && (
            <div className="absolute rounded-md left-0 bg-gray-50 dark:bg-custom-gray3 top-[30px] w-[160px] lg:min-w-[250px] border border-gray-300 dark:border-gray-600 shadow-md z-10">
              <div className="flex items-center justify-between px-2 py-1.5 lg:px-3 lg:py-2">
                <p className="self-center ">All Likes</p>
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
