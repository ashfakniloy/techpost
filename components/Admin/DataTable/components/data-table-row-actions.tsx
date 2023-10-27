"use client";

import { Row } from "@tanstack/react-table";
import {
  Copy,
  MoreHorizontal,
  Pen,
  Star,
  Tags,
  Trash,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import { labels } from "../data/data";
// import { taskSchema } from "../data/schema";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  title: string;
  id: string;
  deleteUrl: string;
  // imageId?: string;
}

export function DataTableRowActions<TData>({
  // row,
  title,
  id,
  deleteUrl,
}: // imageId,
DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // const [postDeleted, setPostDeleted] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete id", id);
    setIsDeleting(true);

    const toastDeletePost = toast.loading("Loading...");

    // const url = deleteUrl;
    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post Deleted", {
        id: toastDeletePost,
      });
      router.refresh();
      // redirectAfterDelete && router.replace(redirectAfterDelete);
      console.log("success", data);
    } else {
      toast.error(data.error, {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        isPending={isDeleting}
        title={`Are you sure you want to delete "${title}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />

      {/* <AlertDialog
        open={showDeleteModal || isDeleting}
        onOpenChange={setShowDeleteModal}
      >
        <AlertDialogContent className="bg-gray-50 dark:bg-custom-gray6">
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
    </>
  );
}
