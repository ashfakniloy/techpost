"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import { CommentReply } from "@prisma/client";
import { deleteReplyAdmin } from "@/db/mutations/admin/deleteReplyAdmin";

interface PostsActions<TData> {
  row: Row<TData>;
}

export function RepliesAction<TData>({ row }: PostsActions<TData>) {
  const commentReply = row.original as CommentReply;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // with server action
  const handleDelete = async () => {
    console.log("delete id", commentReply.id);
    // return;

    setIsDeleting(true);

    const toastDeleteCommentReply = toast.loading("Loading...");

    const result = await deleteReplyAdmin({ deleteId: commentReply.id });

    console.log("result", result);

    if (result?.success) {
      toast.success(result.success, {
        id: toastDeleteCommentReply,
      });
    } else if (result?.error) {
      toast.error(result.error, {
        id: toastDeleteCommentReply,
      });
    } else {
      toast.error("Error", {
        id: toastDeleteCommentReply,
      });
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
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
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        isPending={isDeleting}
        title={`Are you sure you want to delete "${commentReply.commentReply}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

// // with route handler
// "use client";

// import { Row } from "@tanstack/react-table";
// import {
//   Copy,
//   MoreHorizontal,
//   Pen,
//   Star,
//   Tags,
//   Trash,
//   Eye,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// // } from "@/components/ui/alert-dialog";

// // import { labels } from "../data/data";
// // import { postSchema } from "../../data/schema";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";
// import Modal from "@/components/Modal";
// import Link from "next/link";
// import { CommentReply } from "@prisma/client";

// interface PostsActions<TData> {
//   row: Row<TData>;
// }

// export function RepliesAction<TData>({ row }: PostsActions<TData>) {
//   const commentReply = row.original as CommentReply;

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const pathname = usePathname();

//   // console.log("params", pathname);

//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", commentReply.id);
//     // return;

//     setIsDeleting(true);

//     const toastDeleteCommentReply = toast.loading("Loading...");

//     const deleteUrl = `/api/admin/post/comment/reply`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: commentReply.id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("Comment reply deleted", {
//         id: toastDeleteCommentReply,
//       });
//       router.refresh();
//       console.log("success", data);
//     } else {
//       toast.error(data.error, {
//         id: toastDeleteCommentReply,
//       });
//       console.log("error", data);
//     }

//     setShowDeleteModal(false);
//     setIsDeleting(false);
//   };

//   return (
//     <>
//       <DropdownMenu modal={false}>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//           >
//             <MoreHorizontal className="h-4 w-4" />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-[160px]">
//           <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
//             <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Delete
//             {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Modal
//         showModal={showDeleteModal}
//         setShowModal={setShowDeleteModal}
//         isPending={isDeleting}
//         title={`Are you sure you want to delete "${commentReply.commentReply}"?`}
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }
