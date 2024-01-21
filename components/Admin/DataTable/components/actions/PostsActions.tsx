"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import Link from "next/link";
import { deletePostAdmin } from "@/db/mutations/admin/deletePostAdmin";
import type { Post } from "@prisma/client";

interface PostsActions<TData> {
  row: Row<TData>;
}

export function PostsActions<TData>({ row }: PostsActions<TData>) {
  const post = row.original as Post;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // with server action
  const handleDelete = async () => {
    console.log("delete id", post.id);
    setIsDeleting(true);

    const toastDeletePost = toast.loading("Loading...");

    const result = await deletePostAdmin({ deleteId: post.id });

    console.log("result", result);

    if (result?.success) {
      toast.success(result.success, {
        id: toastDeletePost,
      });
    } else if (result?.error) {
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
          <Link href={`/admin/posts/${post.slug}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
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
        title={`Are you sure you want to delete "${post.title}"?`}
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
// import { postSchema } from "../../data/schema";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal";
// import Link from "next/link";
// import { PostAdminTypes } from "@/db/queries/admin/getAllPostsAdmin";

// interface PostsActions<TData> {
//   row: Row<TData>;
//   // title: string;
//   // id: string;
//   // deleteUrl: string;
//   // imageId?: string;
// }

// export function PostsActions<TData>({
//   row,
// }: // title,
// // id,
// // deleteUrl,
// // imageId,
// PostsActions<TData>) {
//   const post = row.original as PostAdminTypes;

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", post.id);
//     setIsDeleting(true);

//     const toastDeletePost = toast.loading("Loading...");

//     // const deleteUrl = `/api/post?postId=${post.id}&imageId=${post.imageId}`;

//     // const response = await fetch(deleteUrl, {
//     //   method: "DELETE",
//     // });

//     const deleteUrl = `/api/admin/post`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: post.id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("Post Deleted", {
//         id: toastDeletePost,
//       });
//       router.refresh();
//       console.log("success", data);
//     } else {
//       toast.error(data.error, {
//         id: toastDeletePost,
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
//           <Link href={`/admin/posts/${post.slug}`}>
//             <DropdownMenuItem>
//               <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//               View
//             </DropdownMenuItem>
//           </Link>
//           {/* <DropdownMenuItem>
//             <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Edit
//           </DropdownMenuItem> */}
//           <DropdownMenuSeparator />
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
//         title={`Are you sure you want to delete "${post.title}"?`}
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }
