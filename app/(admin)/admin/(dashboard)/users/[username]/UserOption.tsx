"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { deleteUserAdmin } from "@/db/mutations/admin/deleteUserAdmin";

type UserOptionProps = {
  id: string;
  username: string;
};

function UserOption({ id, username }: UserOptionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // with server action
  const handleDelete = async () => {
    console.log("delete id", id);
    setIsDeleting(true);

    const toastDeleteUser = toast.loading("Loading...");

    const result = await deleteUserAdmin({ deleteId: id });

    console.log("result", result);

    if (result?.success) {
      toast.success(result.success, {
        id: toastDeleteUser,
      });

      router.replace("/admin/users");
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
          <Button variant="default">Option</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <Link href={`/user/${username}`} target="_blank">
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View in site
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
            <span className="capitalize">{`"${username}"`}</span>?
          </p>
        }
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

export default UserOption;

// // with route handler
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { Eye, Trash } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import Modal from "@/components/Modal";

// type UserOptionProps = {
//   id: string;
//   username: string;
// };

// function UserOption({ id, username }: UserOptionProps) {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", id);
//     setIsDeleting(true);

//     const toastDeleteUser = toast.loading("Loading...");

//     // const deleteUrl = `/api/post?postId=${post.id}&imageId=${post.imageId}`;

//     // const response = await fetch(deleteUrl, {
//     //   method: "DELETE",
//     // });

//     const deleteUrl = `/api/admin/user`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("User Deleted", {
//         id: toastDeleteUser,
//       });
//       router.refresh();
//       router.replace("/admin/users");
//       console.log("success", data);
//     } else {
//       toast.error(data.error, {
//         id: toastDeleteUser,
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
//           <Button variant="default">Option</Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-[160px]">
//           <Link href={`/user/${username}`} target="_blank">
//             <DropdownMenuItem>
//               <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//               View in site
//             </DropdownMenuItem>
//           </Link>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
//             <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Delete
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
//             <span className="capitalize">{`"${username}"`}</span>?
//           </p>
//         }
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }

// export default UserOption;
