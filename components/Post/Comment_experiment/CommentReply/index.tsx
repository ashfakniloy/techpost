// import { getCommentReplies } from "@/prisma/find/getCommentReplies";
// import Link from "next/link";
// import Image from "next/image";
// import { getTimeDistance } from "@/utils/getTimeDistance";
// import ReplyWrapper from "./ReplyWrapper";
// import CommentOption from "../CommentOption";
// import type { Session } from "next-auth";

// async function CommentReply({
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
//   const { count: commentRepliesCount, data: commentReplies } =
//     await getCommentReplies({ commentId });

//   return (
//     <ReplyWrapper
//       commentId={commentId}
//       postId={postId}
//       commentRepliesCount={commentRepliesCount}
//     >
//       {commentReplies.map((reply) => (
//         <div key={reply.id} className="flex gap-3 pt-2">
//           <div className="">
//             {reply.user.profile?.imageUrl ? (
//               <Image
//                 src={reply.user.profile.imageUrl}
//                 alt="user picture"
//                 width={30}
//                 height={30}
//                 className="rounded-full"
//               />
//             ) : (
//               <Image
//                 src="/images/blankUser.jpg"
//                 alt="user image"
//                 width={30}
//                 height={30}
//                 className="rounded-full"
//               />
//             )}
//           </div>

//           <div className="flex-1 w-[10%]">
//             <p className="text-sm font-semibold">
//               <Link
//                 href={`/user/${reply.user.username}`}
//                 className="hover:text-blue-800 dark:hover:text-blue-500"
//               >
//                 {reply.user.username}
//               </Link>
//             </p>
//             <div className="overflow-hidden break-words">
//               <p className="">{reply.commentReply}</p>
//               <div className="flex items-start justify-between">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {getTimeDistance(reply.createdAt)}
//                 </p>
//                 {(session?.user.id === reply.userId ||
//                   session?.user.id === authorId) && (
//                   <CommentOption commentReplyId={reply.id} type="Reply" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </ReplyWrapper>
//   );
// }

// export default CommentReply;

"use client";

import { useState } from "react";
import CommentsReplyForm from "./CommentReplyForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import CommentReplyList from "./CommentReplyList";
import { Session } from "next-auth";
import { CommentReply } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { getTimeDistance } from "@/utils/getTimeDistance";
import CommentOption from "../CommentOption";

type CommentReplies = (CommentReply & {
  user: {
    id: string;
    profile: {
      imageUrl: string | null;
    } | null;
    username: string;
  };
})[];

function Replies({
  commentId,
  postId,
  // commentRepliesCount,
  authorId,
  session,
  replies,
  setCommentDeleted,
  setCommentSubmitted,
}: {
  commentId: string;
  postId: string;
  // commentRepliesCount: number;
  authorId: string;
  session: Session | null;
  replies: CommentReplies;
  setCommentDeleted: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setCommentSubmitted: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
}) {
  const [openReplyForm, setOpenReplyForm] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState(false);

  // const { data: session } = useSession();
  const router = useRouter();

  const handleReplyClick = () => {
    if (session) {
      setOpenReplyForm(commentId);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute top-[-22px] ml-16 lg:left-24 text-sm"
        onClick={handleReplyClick}
      >
        Reply
      </button>

      {openReplyForm === commentId && (
        <div className="pt-2">
          <CommentsReplyForm
            postId={postId}
            setOpenReplyForm={setOpenReplyForm}
            setShowReplies={setShowReplies}
            commentId={commentId}
            setCommentSubmitted={setCommentSubmitted}
          />
        </div>
      )}

      <div className="">
        {/* <div className="">{showReplies && children}</div> */}
        {/* {showReplies && ( */}
        {/* <CommentReplyList
          commentId={commentId}
          postId={postId}
          authorId={authorId}
          session={session}
        /> */}
        {/* )} */}

        {showReplies &&
          replies?.map((reply) => (
            <div key={reply.id} className="flex gap-3 pt-2">
              <div className="">
                {reply.user.profile?.imageUrl ? (
                  <Image
                    src={reply.user.profile.imageUrl}
                    alt="user picture"
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
              </div>

              <div className="flex-1 w-[10%]">
                <p className="text-sm font-semibold">
                  <Link
                    href={`/user/${reply.user.username}`}
                    className="hover:text-blue-800 dark:hover:text-blue-500"
                  >
                    {reply.user.username}
                  </Link>
                </p>
                <div className="overflow-hidden break-words">
                  <p className="">{reply.commentReply}</p>
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getTimeDistance(reply.createdAt)}
                    </p>
                    {(session?.user.id === reply.userId ||
                      session?.user.id === authorId) && (
                      <CommentOption
                        commentReplyId={reply.id}
                        type="Reply"
                        setCommentDeleted={setCommentDeleted}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="flex flex-col justify-center pt-2 ">
          {replies.length > 0 &&
            (!showReplies ? (
              <button
                className="text-sm text-gray-900 dark:text-gray-300"
                onClick={() => setShowReplies(true)}
              >
                {replies.length > 1
                  ? `View ${replies.length} replies`
                  : `View ${replies.length} reply`}
              </button>
            ) : (
              <button
                className="text-sm text-gray-900 dark:text-gray-300"
                onClick={() => setShowReplies(false)}
              >
                Hide {replies.length > 1 ? "replies" : "reply"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Replies;
