"use client";

import { DynamicField } from "@/components/Form/DynamicField";
import { ImageField } from "@/components/Form/ImageField";
import { InputField } from "@/components/Form/InputField";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BadgeCheck, Eye, Trash } from "lucide-react";
import Modal from "@/components/Modal";
import Link from "next/link";

type PostOptionProps = {
  id: string;
  title: string;
  slug: string;
  isEditorsChoice: boolean;
};

function PostOption({ id, title, slug, isEditorsChoice }: PostOptionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete id", id);
    setIsDeleting(true);

    const toastDeletePost = toast.loading("Loading...");

    // const deleteUrl = `/api/post?postId=${post.id}&imageId=${post.imageId}`;

    // const response = await fetch(deleteUrl, {
    //   method: "DELETE",
    // });

    const deleteUrl = `/api/admin/post`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteId: id }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post Deleted", {
        id: toastDeletePost,
      });
      router.refresh();
      router.replace("/admin/posts");
      console.log("success", data);
    } else {
      toast.error("Something went wrong", {
        id: toastDeletePost,
      });
      console.log("error", data);
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const toastEditorsChoice = toast.loading("Loading...");

    const url = `/api/admin/editors-choice?postId=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      router.refresh();

      toast.success("Marked as editor's choice", {
        id: toastEditorsChoice,
      });
      console.log("success", data);

      setShowChoiceModal(false);
    } else {
      toast.error(`${data.error}`, {
        id: toastEditorsChoice,
      });
      console.log("error", data);
    }

    setIsSubmitting(false);

    // router.push("/add-post/preview");
  };

  const handleEditorsChoice = () => {
    isEditorsChoice
      ? toast.error(`Already marked as editor's choice`)
      : setShowChoiceModal(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">Option</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[220px]">
          <Link href={`/post/${slug}`} target="_blank">
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View in site
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleEditorsChoice}>
            <BadgeCheck className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {`Mark as editor's choice`}
          </DropdownMenuItem>
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
        title={`Are you sure you want to delete post "${title}"?`}
        handleAction={handleDelete}
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />

      <Modal
        showModal={showChoiceModal}
        setShowModal={setShowChoiceModal}
        isPending={isSubmitting}
        title={`Are you sure you want to make "${title}" as editor's choice?`}
        handleAction={handleSubmit}
        as="yes"
        color="bg-gray-50"
        colorDark="dark:bg-custom-gray6"
      />
    </>
  );
}

export default PostOption;
