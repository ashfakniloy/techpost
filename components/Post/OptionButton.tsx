"use client";

import React, { useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Modal from "../Modal";
import { revalidatePosts } from "@/actions/revalidatePosts";
import { revalidateAllRoutes } from "@/actions/revalidateAllRoutes";

function OptionButton({
  title,
  postId,
  slug,
  imageId,
  redirectAfterDelete,
}: {
  title: string;
  postId: string;
  slug: string;
  imageId: string;
  redirectAfterDelete?: string;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete postid", postId);
    setIsDeleting(true);

    const toastDeletePost = toast.loading("Loading...");

    const url = `/api/post?postId=${postId}&imageId=${imageId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post Deleted", {
        id: toastDeletePost,
      });
      // router.refresh();
      revalidateAllRoutes();
      redirectAfterDelete && router.replace(redirectAfterDelete);
      console.log("success", data);
    } else {
      toast.error("Something went wrong", {
        id: toastDeletePost,
      });
      console.log("error", data);
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
    // setPostDeleted(true);
  };

  // useEffect(() => {
  //   const deletcloudinaryimage = async () => {
  //     const response = await fetch(`/api/image?imageId=${imageId}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("success deleted cloudinary image", data);
  //     } else {
  //       console.log("error deleted cloudinary image", data);
  //     }
  //   };

  //   imageId && postDeleted && deletcloudinaryimage();

  //   return () => setPostDeleted(false);
  // }, [postDeleted]);

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

      {/* <AlertDialog
        open={showDeleteModal || isDeleting}
        onOpenChange={setShowDeleteModal}
      >
        <AlertDialogContent className="bg-gray-50 dark:bg-custom-gray2">
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you sure you want to delete post "${title}"?`}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="border dark:border-gray-600 bg-transparent dark:hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* {showDeleteModal && (
        <div className="fixed inset-0 z-20 w-full h-screen overflow-y-hidden bg-black bg-opacity-50">
          <div className="flex items-center justify-center h-screen">
            <div className="max-w-[400px] bg-gray-50 dark:bg-custom-gray2 p-5">
              <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-lg text-center">
                  {`Are you sure you want to delete post "${title}"?`}
                </p>
              </div>

              {!isDeleting ? (
                <div className="flex items-center justify-center mt-5 text-sm text-white gap-7">
                  <button
                    className="px-4 py-2 font-semibold bg-blue-600 rounded"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 font-semibold bg-red-600 rounded disabled:bg-opacity-50"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-5 text-sm">
                  <button className="px-4 py-2 font-semibold text-white rounded cursor-not-allowed bg-red-600/50">
                    Deleting . . .
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default OptionButton;
