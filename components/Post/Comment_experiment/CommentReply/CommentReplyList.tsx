// // "use client";

// import { getCommentReplies } from "@/prisma/find/getCommentReplies";
// import Link from "next/link";
// import Image from "next/image";
// import { getTimeDistance } from "@/utils/getTimeDistance";
// import CommentOption from "../CommentOption";
// import type { Session } from "next-auth";
// // import { useEffect, useState } from "react";
// import { CommentReply } from "@prisma/client";
// import { commentRepliesGetAction } from "./commentRepliesGetAction";

// type CommentReplies = (CommentReply & {
//   user: {
//     id: string;
//     profile: {
//       imageUrl: string | null;
//     } | null;
//     username: string;
//   };
// })[];

// async function CommentReplyList({
//   commentId,
//   postId,
//   authorId,
//   session,
// }: {
//   commentId: string;
//   postId: string;
//   authorId: string;
//   session: Session | null;
// }) {
//   // const [commentReplies, setCommentReplies] = useState<CommentReplies | null>(
//   //   null
//   // );
//   // const [commentRepliesCount, setCommentRepliesCount] = useState<number>(0);
//   // const [showReplies, setShowReplies] = useState(false);

//   // useEffect(() => {
//   //   const getReplies = async () => {
//   //     const { commentReplies, commentRepliesCount } =
//   //       await commentRepliesGetAction({ commentId });

//   //     showReplies && setCommentReplies(commentReplies);
//   //     setCommentRepliesCount(commentRepliesCount);
//   //   };

//   //   getReplies();
//   // }, [showReplies]);

//   // const { count: commentRepliesCount, data: commentReplies } =
//   //   await getCommentReplies({ commentId });

//   let showReplies = true;
//   let commentReplies;
//   let commentRepliesCount;

//   const action = async () => {
//     const { commentReplies: replies, commentRepliesCount: count } =
//       await commentRepliesGetAction({ commentId });

//     commentReplies = replies as CommentReplies;
//     commentRepliesCount = count as number;

//     showReplies = true;
//   };

//   return (
//     <>
//       {
//         // showReplies &&
//         commentReplies?.map((reply) => (
//           <div key={reply.id} className="flex gap-3 pt-2">
//             <div className="">
//               {reply.user.profile?.imageUrl ? (
//                 <Image
//                   src={reply.user.profile.imageUrl}
//                   alt="user picture"
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
//             </div>

//             <div className="flex-1 w-[10%]">
//               <p className="text-sm font-semibold">
//                 <Link
//                   href={`/user/${reply.user.username}`}
//                   className="hover:text-blue-800 dark:hover:text-blue-500"
//                 >
//                   {reply.user.username}
//                 </Link>
//               </p>
//               <div className="overflow-hidden break-words">
//                 <p className="">{reply.commentReply}</p>
//                 <div className="flex items-start justify-between">
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {getTimeDistance(reply.createdAt)}
//                   </p>
//                   {(session?.user.id === reply.userId ||
//                     session?.user.id === authorId) && (
//                     <CommentOption commentReplyId={reply.id} type="Reply" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       }

//       <div className="flex flex-col justify-center pt-2 ">
//         {commentRepliesCount > 0 &&
//           (!showReplies ? (
//             <button
//               className="text-sm text-gray-900 dark:text-gray-300"
//               // onClick={() => setShowReplies(true)}
//               formAction={action}
//             >
//               {commentRepliesCount > 1
//                 ? `View ${commentRepliesCount} replies`
//                 : `View ${commentRepliesCount} reply`}
//             </button>
//           ) : (
//             <button
//               className="text-sm text-gray-900 dark:text-gray-300"
//               onClick={() => setShowReplies(false)}
//             >
//               Hide {commentRepliesCount > 1 ? "replies" : "reply"}
//             </button>
//           ))}
//       </div>
//     </>
//   );
// }

// export default CommentReplyList;
