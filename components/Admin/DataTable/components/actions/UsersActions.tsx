"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/Modal";
import { deleteUserAdmin } from "@/db/mutations/admin/deleteUserAdmin";
import type { User } from "@prisma/client";

interface UsersActions<TData> {
  row: Row<TData>;
}

export function UsersActions<TData>({ row }: UsersActions<TData>) {
  const user = row.original as User;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // with server action
  const handleDelete = async () => {
    console.log("delete id", user.id);
    setIsDeleting(true);

    const toastDeleteUser = toast.loading("Loading...");

    const result = await deleteUserAdmin({ deleteId: user.id });

    // console.log("result", result);

    if (result?.success) {
      toast.success(result.success, {
        id: toastDeleteUser,
      });
    } else if (result?.error) {
      toast.error(result.error, {
        id: toastDeleteUser,
      });
    } else {
      toast.error("Error", {
        id: toastDeleteUser,
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
          <Link href={`/admin/users/${user.username}`}>
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
        title={
          <p>
            Are you sure you want to delete{" "}
            <span className="capitalize">{`"${user.username}"`}</span>?
          </p>
        }
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

// // with route handler
// "use client";

// import { useState } from "react";
// import { Row } from "@tanstack/react-table";
// import { MoreHorizontal, Pen, Trash, Eye } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { userSchema } from "../../data/schema";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Modal from "@/components/Modal";
// import Link from "next/link";

// interface UsersActions<TData> {
//   row: Row<TData>;
// }

// export function UsersActions<TData>({ row }: UsersActions<TData>) {
//   const user = userSchema.parse(row.original);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", user.id);
//     setIsDeleting(true);

//     const toastDeletePost = toast.loading("Loading...");

//     const deleteUrl = `/api/admin/user`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: user.id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success(`User ${user.username} deleted`, {
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
//           <Link href={`/admin/users/${user.username}`}>
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
//         title={
//           <p>
//             Are you sure you want to delete{" "}
//             <span className="capitalize">{`"${user.username}"`}</span>?
//           </p>
//         }
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }
