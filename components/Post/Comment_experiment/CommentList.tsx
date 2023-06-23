"use client";

import Replies from "./CommentReply";
import CommentOption from "./CommentOption";
import Link from "next/link";
import Image from "next/image";
import { getTimeDistance } from "@/utils/getTimeDistance";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import type { Comment, CommentLike, CommentReply } from "@prisma/client";
import Likes from "./CommentLike";

type CommentReplies = (CommentReply & {
  user: {
    id: string;
    profile: {
      imageUrl: string | null;
    } | null;
    username: string;
  };
})[];

type CommentsLikes = (CommentLike & {
  user: {
    profile: {
      imageUrl: string | null;
    } | null;
    id: string;
    username: string;
  };
})[];

type Comments = (Comment & {
  user: {
    id: string;
    profile: {
      imageUrl: string | null;
    } | null;
    username: string;
  };

  commentsReplies: CommentReplies;
  commentsLikes: CommentsLikes;
})[];

type CommentListProps = {
  session: Session | null;
  initialComments: Comments;
  totalComments: number;
  authorId: string;
  postId: string;
};

function CommentList({
  session,
  initialComments,
  totalComments,
  authorId,
  postId,
}: CommentListProps) {
  // const [showComments, setShowComments] = useState<number | null>(null)
  const [paginatedComments, setPaginatedComments] = useState<Comments | null>(
    null
  );
  const [visibleComments, setVisibleComments] = useState(5);
  const [commentDeleted, setCommentDeleted] = useState<
    string | null | undefined
  >(null);
  const [commentSubmitted, setCommentSubmitted] = useState<
    string | null | undefined
  >(null);
  // const [disableDelete, setDisableDelete] = useState(false);

  const handleClick = () => {
    setVisibleComments((prev) => prev + 5);
  };

  useEffect(() => {
    const getPaginatedComments = async () => {
      const res = await fetch(
        `/api/post/comment?postId=${postId}&page=${visibleComments}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setPaginatedComments(data.comments);
        // setLoading(false);
        console.log("data", data);
      } else {
        console.log(data);
        // setLoading(false);
      }
    };

    visibleComments > 5 && getPaginatedComments();
  }, [visibleComments, commentDeleted, commentSubmitted]);

  const comments = paginatedComments ?? initialComments;

  return (
    <div className="mt-3">
      <p className="">
        {totalComments > 0
          ? totalComments > 1
            ? `${totalComments} comments`
            : `${totalComments} comment`
          : "No comments yet"}
      </p>

      <div className="mt-2 space-y-5 ">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2"
          >
            <div className="flex gap-3 break-words">
              <div className="">
                {comment.user.profile?.imageUrl ? (
                  <Image
                    src={comment.user.profile.imageUrl}
                    alt={comment.user.username}
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
              <div className="flex-1 w-[10%]">
                <p className="text-sm font-semibold">
                  <Link
                    href={`/user/${comment.user.username}`}
                    className="hover:text-blue-800 dark:hover:text-blue-500"
                  >
                    {comment.user.username}
                  </Link>
                </p>
                <div className="">
                  <p className="overflow-hidden break-words">
                    {comment.comment}
                  </p>
                </div>
                <div className="relative ">
                  <div className="relative flex w-full justify-between items-center text-sm">
                    <Likes
                      commentId={comment.id}
                      // likes={comment.commentsLikes}
                    />

                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 dark:text-gray-400 ml-16">
                        {getTimeDistance(comment.createdAt)}
                      </p>
                    </div>

                    {(session?.user.id === comment.userId ||
                      session?.user.id === authorId) && (
                      <div className="">
                        <CommentOption
                          commentId={comment.id}
                          type="Comment"
                          setCommentDeleted={setCommentDeleted}
                        />
                      </div>
                    )}
                  </div>

                  <Replies
                    commentId={comment.id}
                    postId={postId}
                    authorId={authorId}
                    session={session}
                    replies={comment.commentsReplies}
                    setCommentDeleted={setCommentDeleted}
                    setCommentSubmitted={setCommentSubmitted}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length < totalComments && totalComments > 5 ? (
        <div className="flex justify-center mt-3">
          <button
            className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50"
            // onClick={() => setVisibleComments((prev) => prev + 5)}
            onClick={handleClick}
          >
            View more comments
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommentList;

// "use client";

// // import CommentReply from "./CommentReply";
// import CommentOption from "./CommentOption";
// import CommentLike from "./CommentLike";
// import Link from "next/link";
// import Image from "next/image";
// import { getTimeDistance } from "@/utils/getTimeDistance";
// import type { Session } from "next-auth";
// import { useEffect, useState } from "react";
// import type { Comment } from "@prisma/client";
// import { commentgetAction } from "./commentgetAction";
// import { useRouter } from "next/navigation";

// type Comments = (Comment & {
//   user: {
//     profile: {
//       imageUrl: string | null;
//     } | null;
//     id: string;
//     username: string;
//   };
// })[];

// type CommentListProps = {
//   session: Session | null;
//   initialComments: Comments;
//   totalComments: number;
//   authorId: string;
//   postId: string;
// };

// function CommentList({
//   session,
//   initialComments,
//   totalComments,
//   authorId,
//   postId,
// }: CommentListProps) {
//   const router = useRouter();
//   // const [showComments, setShowComments] = useState<number | null>(null)
//   const [paginatedComments, setPaginatedComments] = useState<Comments | null>(
//     initialComments
//   );
//   const [visibleComments, setVisibleComments] = useState(10);
//   const [commentDeleted, setCommentDeleted] = useState<
//     string | null | undefined
//   >(null);

//   const handleClick = async () => {
//     setVisibleComments((prev) => prev + 5);

//     const { data } = await commentgetAction({ postId, take: visibleComments });

//     setPaginatedComments(data);

//     console.log("data", data);
//   };

//   // useEffect(() => {
//   //   const getPaginatedComments = async () => {
//   //     // setSearchResult(null);

//   //     const res = await fetch(
//   //       `/api/post/comment?postId=${postId}&page=${visibleComments}`,
//   //       {
//   //         cache: "no-store",
//   //       }
//   //     );
//   //     const data = (await res.json()) as Comments;

//   //     if (res.ok) {
//   //       setPaginatedComments(data);
//   //       // setLoading(false);
//   //       console.log("data", data);
//   //     } else {
//   //       console.log(data);
//   //       // setLoading(false);
//   //     }
//   //   };

//   //   visibleComments > 5 && getPaginatedComments();
//   // }, [visibleComments, commentDeleted]);

//   // const comments = paginatedComments ?? initialComments;
//   const comments = paginatedComments;

//   const filteredComments = comments?.filter(
//     (comment) => comment.id !== commentDeleted
//   );

//   return (
//     <div className="mt-3">
//       <p className="">
//         {totalComments > 0
//           ? totalComments > 1
//             ? `${totalComments} comments`
//             : `${totalComments} comment`
//           : "No comments yet"}
//       </p>

//       <div className="mt-2 space-y-5 ">
//         {filteredComments?.map((comment) => (
//           <div
//             key={comment.id}
//             className="p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2"
//           >
//             <div className="flex gap-3 break-words">
//               <div className="">
//                 {comment.user.profile?.imageUrl ? (
//                   <Image
//                     src={comment.user.profile.imageUrl}
//                     alt={comment.user.username}
//                     width={35}
//                     height={35}
//                     className="rounded-full"
//                   />
//                 ) : (
//                   <Image
//                     src="/images/blankUser.jpg"
//                     alt="user image"
//                     width={35}
//                     height={35}
//                     className="rounded-full"
//                   />
//                 )}
//               </div>
//               <div className="flex-1 w-[10%]">
//                 <p className="text-sm font-semibold">
//                   <Link
//                     href={`/user/${comment.user.username}`}
//                     className="hover:text-blue-800 dark:hover:text-blue-500"
//                   >
//                     {comment.user.username}
//                   </Link>
//                 </p>
//                 <div className="">
//                   <p className="overflow-hidden break-words">
//                     {comment.comment}
//                   </p>
//                 </div>
//                 <div className="relative ">
//                   <div className="relative flex w-full justify-between items-center text-sm">
//                     <div className="flex items-center gap-2">
//                       <p className="text-gray-600 dark:text-gray-400 ml-16">
//                         {getTimeDistance(comment.createdAt)}
//                       </p>
//                     </div>

//                     {(session?.user.id === comment.userId ||
//                       session?.user.id === authorId) && (
//                       <div className="">
//                         <CommentOption
//                           commentId={comment.id}
//                           type="Comment"
//                           setCommentDeleted={setCommentDeleted}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {totalComments > 5 && comments.length < totalComments ? (
//         <div className="flex justify-center mt-3">
//           <button
//             className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50"
//             // onClick={() => setVisibleComments((prev) => prev + 5)}
//             onClick={handleClick}
//           >
//             View more comments
//           </button>
//         </div>
//       ) : (
//         ""
//       )}

//       {/* <div className="flex justify-center mt-3">
//         <button
//           className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50"
//           // onClick={() => setVisibleComments((prev) => prev + 5)}
//           onClick={handleClick}
//         >
//           View more comments
//         </button>
//       </div> */}
//     </div>
//   );
// }

// export default CommentList;
