"use client";

import React, { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Modal from "../Modal";
import { deletePost } from "@/db/mutations/user/post/deletePost";

function OptionButton({
  title,
  postId,
  slug,
  redirectAfterDelete,
}: {
  title: string;
  postId: string;
  slug: string;
  redirectAfterDelete?: string;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  // // with server action
  const handleDelete = async () => {
    setIsDeleting(true);

    const toastDeletePost = toast.loading("Loading...");

    const result = await deletePost({ postId: postId });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastDeletePost,
      });

      redirectAfterDelete && router.replace(redirectAfterDelete);
    } else if (result.error) {
      toast.error(result.error, {
        id: toastDeletePost,
      });
    } else {
      toast.error("Error", {
        id: toastDeletePost,
      });
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  // // with route handler
  // const handleDelete = async () => {
  //   console.log("delete postid", postId);
  //   setIsDeleting(true);

  //   const toastDeletePost = toast.loading("Loading...");

  //   const url = `/api/post?postId=${postId}&imageId=${imageId}`;
  //   const response = await fetch(url, {
  //     method: "DELETE",
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     toast.success("Post Deleted", {
  //       id: toastDeletePost,
  //     });
  //     // router.refresh();
  //     revalidateAllRoutes();
  //     redirectAfterDelete && router.replace(redirectAfterDelete);
  //     console.log("success", data);
  //   } else {
  //     toast.error(data.error, {
  //       id: toastDeletePost,
  //     });
  //     console.log("error", data);
  //   }

  //   setShowDeleteModal(false);
  //   setIsDeleting(false);
  //   // setPostDeleted(true);
  // };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="option"
            className="rounded-full cursor-pointer p-1 active:bg-gray-300/50 dark:active:bg-gray-700 lg:hover:bg-gray-300/50 lg:dark:hover:bg-gray-700"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="absolute -top-[65px] right-5 lg:right-8 z-10 p-0 w-[100px] lg:w-[120px] flex flex-col rounded-md font-montserrat text-black dark:text-gray-50 bg-gray-50 dark:bg-custom-gray2 text-xs lg:text-sm border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
          <Link href={`/edit-post/${slug}`}>
            <button
              type="button"
              aria-label="edit"
              className="w-full px-3 py-2 border-b border-gray-300  hover:bg-gray-200 dark:hover:bg-custom-gray3 dark:border-gray-700 text-start"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            aria-label="delete"
            className="w-full px-3  py-2 hover:bg-gray-200 dark:hover:bg-custom-gray3 text-start"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </PopoverContent>
      </Popover>

      <Modal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        isPending={isDeleting}
        title={`Are you sure you want to delete post "${title}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray2"
      />
    </>
  );
}

export default OptionButton;
