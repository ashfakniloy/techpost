"use client";

import useToggle from "@/hooks/useToggle";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CommentOption({
  setCommentDeleted,
  commentId,
  commentReplyId,
  type,
}: {
  type: "Comment" | "Reply";
  setCommentDeleted: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  commentId?: string;
  commentReplyId?: string;
}) {
  const { node, toggle: showOptions, setToggle: setShowOptions } = useToggle();
  const [disableDelete, setDisableDelete] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete postid", commentId);
    setDisableDelete(true);

    const toastDeletePost = toast.loading("Loading...");

    const getUrl = () => {
      if (type === "Comment") {
        return `/api/post/comment?commentId=${commentId}`;
      }
      if (type === "Reply") {
        return `/api/post/comment/commentReply?commentReplyId=${commentReplyId}`;
      }
    };

    const url = getUrl();

    const response = await fetch(url!, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Comment Deleted", {
        id: toastDeletePost,
      });
      router.refresh();
      type === "Comment" && setCommentDeleted(commentId);
      type === "Reply" && setCommentDeleted(commentReplyId);

      console.log("success", data);
    } else {
      toast.error("Something went wrong", {
        id: toastDeletePost,
      });
      console.log("error", data);
    }

    setDisableDelete(false);
    setShowOptions(false);
  };

  return (
    <div ref={node} className="relative">
      <div
        className="rounded-full cursor-pointer lg:p-1 hover:bg-gray-300/50 dark:hover:bg-gray-700 "
        onClick={() => setShowOptions(!showOptions)}
      >
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>

      {showOptions && (
        <div className="absolute bottom-0 right-8 z-10">
          <div className="min-w-[80px] lg:min-w-[120px] flex flex-col bg-gray-50 dark:bg-custom-gray2 text-xs rounded-md border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
            <button
              className="p-2 lg:p-3 hover:bg-gray-200 dark:hover:bg-custom-gray3 w-full text-start disabled:cursor-not-allowed"
              onClick={handleDelete}
              disabled={disableDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentOption;
