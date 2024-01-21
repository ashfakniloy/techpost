"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, Pen, Trash } from "lucide-react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import EditCategory from "./EditCategory";
import { deleteCategory } from "@/db/mutations/admin/deleteCategory";

export type CategoryOptionProps = {
  id: string;
  name: string;
  imageUrl: string;
  imageId: string;
  quotes?: {
    quote: string;
    author: string;
  }[];
};

function CategoryOption({
  id,
  name,
  imageUrl,
  imageId,
  quotes,
}: CategoryOptionProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // with server action
  const handleDelete = async () => {
    console.log("delete id", id);
    setIsDeleting(true);

    const toastDeleteCategory = toast.loading("Loading...");

    const result = await deleteCategory({ categoryId: id });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastDeleteCategory,
      });

      router.replace("/admin/categories");
    } else if (result.error) {
      toast.error(result.error, {
        id: toastDeleteCategory,
      });
    } else {
      toast.error("Error", {
        id: toastDeleteCategory,
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
          <Link href={`/category/${name}`} target="_blank">
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View in site
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showEditModal} onOpenChange={setShowEditModal}>
        <AlertDialogContent className="relative bg-gray-50 dark:bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
          <EditCategory
            id={id}
            name={name}
            imageUrl={imageUrl}
            imageId={imageId}
            quotes={quotes}
            setShowEditModal={setShowEditModal}
          />
        </AlertDialogContent>
      </AlertDialog>

      <Modal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        isPending={isDeleting}
        title={`Are you sure you want to delete category "${name}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

export default CategoryOption;

// // with route handler
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { Eye, Pen, Trash } from "lucide-react";
// import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import Modal from "@/components/Modal";
// import EditCategory from "./EditCategory";

// export type CategoryOptionProps = {
//   id: string;
//   name: string;
//   imageUrl: string;
//   imageId: string;
//   quotes?: {
//     quote: string;
//     author: string;
//   }[];
// };

// function CategoryOption({
//   id,
//   name,
//   imageUrl,
//   imageId,
//   quotes,
// }: CategoryOptionProps) {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const [isDeleting, setIsDeleting] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     console.log("delete id", id);
//     setIsDeleting(true);

//     const toastDeleteCategory = toast.loading("Loading...");

//     const deleteUrl = `/api/admin/category`;

//     const response = await fetch(deleteUrl, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId: id }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("Category Deleted", {
//         id: toastDeleteCategory,
//       });
//       router.refresh();
//       router.replace("/admin/categories");
//       console.log("success", data);
//     } else {
//       toast.error(data.error, {
//         id: toastDeleteCategory,
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
//           <Link href={`/category/${name}`} target="_blank">
//             <DropdownMenuItem>
//               <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//               View in site
//             </DropdownMenuItem>
//           </Link>
//           <DropdownMenuItem onClick={() => setShowEditModal(true)}>
//             <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Edit
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
//             <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <AlertDialog open={showEditModal} onOpenChange={setShowEditModal}>
//         <AlertDialogContent className="relative bg-gray-50 dark:bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
//           <EditCategory
//             id={id}
//             name={name}
//             imageUrl={imageUrl}
//             imageId={imageId}
//             quotes={quotes}
//             setShowEditModal={setShowEditModal}
//           />
//         </AlertDialogContent>
//       </AlertDialog>

//       <Modal
//         showModal={showDeleteModal}
//         setShowModal={setShowDeleteModal}
//         isPending={isDeleting}
//         title={`Are you sure you want to delete category "${name}"?`}
//         handleAction={handleDelete}
//         color="bg-gray-50"
//         colorDark="dark:bg-custom-gray6"
//       />
//     </>
//   );
// }

// export default CategoryOption;
