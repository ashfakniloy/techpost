"use client";

import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteComment } from "@/db/mutations/user/post/deleteComment";
import { deleteCommentReply } from "@/db/mutations/user/post/deleteCommentReply";

function CommentOption({
  commentId,
  commentReplyId,
  type,
}: {
  commentId?: string;
  commentReplyId?: string;
  type: "Comment" | "Reply";
}) {
  const [isPending, startTransition] = useTransition();

  // with server action
  const handleDelete = () => {
    startTransition(async () => {
      if (type === "Comment") {
        if (!commentId) return;
        const result = await deleteComment({ commentId });

        console.log("result", result);

        if (result.success) {
          toast.success(result.success);
        } else if (result.error) {
          toast.error(result.error);
        } else {
          toast.error("Error");
        }
      }

      if (type === "Reply") {
        if (!commentReplyId) return;
        const result = await deleteCommentReply({ commentReplyId });

        console.log("result", result);

        if (result.success) {
          toast.success(result.success);
        } else if (result.error) {
          toast.error(result.error);
        } else {
          toast.error("Error");
        }
      }
    });
  };

  // // with route handler
  // const handleDelete = async () => {
  //   console.log("delete postid", commentId);
  //   setDisableDelete(true);

  //   const toastDeletePost = toast.loading("Loading...");

  //   const getUrl = () => {
  //     if (type === "Comment") {
  //       return `/api/post/comment?commentId=${commentId}`;
  //     }
  //     if (type === "Reply") {
  //       return `/api/post/comment/commentReply?commentReplyId=${commentReplyId}`;
  //     }
  //   };

  //   const url = getUrl();

  //   const response = await fetch(url!, {
  //     method: "DELETE",
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     toast.success(`${type} deleted`, {
  //       id: toastDeletePost,
  //     });
  //     router.refresh();

  //     console.log("success", data);
  //   } else {
  //     toast.error(data.error, {
  //       id: toastDeletePost,
  //     });
  //     console.log("error", data);
  //   }

  //   setDisableDelete(false);
  //   // setShowOptions(false);
  // };

  const keyByType =
    (type === "Comment" && commentId) ||
    (type === "Reply" && commentReplyId) ||
    "";

  return (
    <Popover key={keyByType}>
      <PopoverTrigger>
        <div className="rounded-full cursor-pointer p-1 active:bg-gray-300/50 dark:active:bg-gray-700 lg:hover:bg-gray-300/50 lg:dark:hover:bg-gray-700">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="absolute bottom-0 right-7 z-10 p-0 w-[100px] lg:w-[120px] flex flex-col rounded-md font-montserrat text-black dark:text-gray-50 bg-gray-50 dark:bg-custom-gray2 text-xs lg:text-sm border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
        <button
          className="w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-custom-gray3 text-start disabled:pointer-events-none disabled:opacity-70"
          onClick={handleDelete}
          disabled={isPending}
        >
          Delete
        </button>
      </PopoverContent>
    </Popover>
    // <div ref={node} className="relative">
    //   <div
    //     className="rounded-full cursor-pointer lg:p-1 hover:bg-gray-300/50 dark:hover:bg-gray-700 "
    //     onClick={() => setShowOptions(!showOptions)}
    //   >
    //     <EllipsisHorizontalIcon className="h-5 w-5" />
    //   </div>

    //   {showOptions && (
    //     <div className="absolute bottom-0 right-8 z-10">
    //       <div className="min-w-[80px] lg:min-w-[120px] flex flex-col bg-gray-50 dark:bg-custom-gray2 text-xs rounded-md border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
    //         <button
    //           className="p-2 lg:p-3 hover:bg-gray-200 dark:hover:bg-custom-gray3 w-full text-start disabled:cursor-not-allowed"
    //           onClick={handleDelete}
    //           disabled={disableDelete}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

export default CommentOption;
