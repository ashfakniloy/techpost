"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { toast } from "react-hot-toast";
import { MoreHorizontal, Trash } from "lucide-react";
import { Comment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/Modal";
import { deleteCommentAdmin } from "@/db/mutations/admin/deleteCommentAdmin";

interface PostsActions<TData> {
  row: Row<TData>;
}

export function CommentsAction<TData>({ row }: PostsActions<TData>) {
  const comment = row.original as Comment;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // with server action
  const handleDelete = async () => {
    console.log("delete id", comment.id);
    // return;

    setIsDeleting(true);

    const toastDeleteComment = toast.loading("Loading...");

    const result = await deleteCommentAdmin({ deleteId: comment.id });

    console.log("result", result);

    if (result?.success) {
      toast.success(result.success, {
        id: toastDeleteComment,
      });
    } else if (result?.error) {
      toast.error(result.error, {
        id: toastDeleteComment,
      });
    } else {
      toast.error("Error", {
        id: toastDeleteComment,
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
        title={`Are you sure you want to delete "${comment.comment}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

// // with route handlers
// "use client";

// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal, Trash, ThumbsUp, Reply } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { usePathname, useRouter } from "next/navigation";
// import Modal from "@/components/Modal";
// import Link from "next/link";
// import { Comment } from "@prisma/client";

// interface PostsActions<TData> {
//   row: Row<TData>;
// }

// export function CommentsAction<TData>({ row }: PostsActions<TData>) {
//   const comment = row.original as Comment;

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const pathname = usePathname();

//   // console.log("params", pathname);

//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", comment.id);
//     // return;

//     setIsDeleting(true);

//     const toastDeleteComment = toast.loading("Loading...");

//     const deleteUrl = `/api/admin/post/comment`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: comment.id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("Comment Deleted", {
//         id: toastDeleteComment,
//       });
//       router.refresh();
//       console.log("success", data);
//     } else {
//       toast.error(data.error, {
//         id: toastDeleteComment,
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
//           {/* <Link
//             href={`${pathname}?showReplies=${comment.id}`}
//             scroll={false}
//             replace={true}
//           >
//             <DropdownMenuItem>
//               <ThumbsUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//               View Likes
//             </DropdownMenuItem>
//           </Link>

//           <Link
//             href={`${pathname}?showReplies=${comment.id}`}
//             scroll={false}
//             replace={true}
//           >
//             <DropdownMenuItem>
//               <Reply className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//               View Replies
//             </DropdownMenuItem>
//           </Link>

//           <DropdownMenuSeparator /> */}
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
//         title={`Are you sure you want to delete "${comment.comment}"?`}
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }
