"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentsReplyForm from "./CommentReplyForm";

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
  const pathname = usePathname();

  const handleReplyClick = () => {
    if (session && session.user.role === "USER") {
      setOpenReplyForm(!openReplyForm);
    } else {
      router.push(`/signin?callback_url=${pathname}`);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="reply"
        className="absolute top-[-19px] lg:top-[-22px] left-[120px] lg:left-[120px] text-xs lg:text-sm hover:text-blue-500"
        onClick={handleReplyClick}
      >
        Reply
      </button>

      <div className="pt-2 pl-[38px]">
        {openReplyForm && (
          <CommentsReplyForm
            postId={postId}
            setOpenReplyForm={setOpenReplyForm}
            setShowReplies={setShowReplies}
            commentId={commentId}
          />
        )}
        {showReplies && children}
      </div>

      <div className="pt-2 flex justify-center">
        {commentRepliesCount > 0 &&
          (!showReplies ? (
            <button
              type="button"
              aria-label="view replies"
              className="text-sm text-gray-900 dark:text-gray-300 px-5 py-1 bg-gray-50 dark:bg-custom-gray2 hover:bg-gray-200 dark:hover:bg-stone-700 rounded-full transition-colors duration-200"
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
              className="text-sm text-gray-900 dark:text-gray-300 px-5 py-1 bg-gray-50 dark:bg-custom-gray2 hover:bg-gray-200 dark:hover:bg-stone-700 rounded-full transition-colors duration-200"
              onClick={() => setShowReplies(false)}
            >
              Hide {commentRepliesCount > 1 ? "replies" : "reply"}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ReplyWrapper;
