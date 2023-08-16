"use client";

import { useState } from "react";
import CommentsReplyForm from "./CommentReplyForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ReplyWrapper({
  commentId,
  postId,
  commentRepliesCount,
  children,
}: {
  commentId: string;
  postId: string;
  commentRepliesCount: number;
  children: React.ReactNode;
}) {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  // const [showReplies, setShowReplies] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleReplyClick = () => {
    if (session && session.user.role === "USER") {
      setOpenReplyForm(!openReplyForm);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="reply"
        className="absolute top-[-23px] lg:top-[-25px] ml-16 lg:left-24 text-sm hover:text-blue-500"
        onClick={handleReplyClick}
      >
        Reply
      </button>

      {openReplyForm && (
        <div className="pt-2">
          <CommentsReplyForm
            postId={postId}
            setOpenReplyForm={setOpenReplyForm}
            setShowReplies={setShowReplies}
            commentId={commentId}
          />
        </div>
      )}

      <div className="">
        <div className="">{showReplies && children}</div>

        <div className="flex flex-col justify-center pt-2">
          {commentRepliesCount > 0 &&
            (!showReplies ? (
              <button
                type="button"
                aria-label="view replies"
                className="text-sm text-gray-900 dark:text-gray-300"
                onClick={() => setShowReplies(true)}
              >
                {commentRepliesCount > 1
                  ? `View ${commentRepliesCount} replies`
                  : `View ${commentRepliesCount} reply`}
              </button>
            ) : (
              <button
                type="button"
                aria-label="hide replies"
                className="text-sm text-gray-900 dark:text-gray-300"
                onClick={() => setShowReplies(false)}
              >
                Hide {commentRepliesCount > 1 ? "replies" : "reply"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ReplyWrapper;
