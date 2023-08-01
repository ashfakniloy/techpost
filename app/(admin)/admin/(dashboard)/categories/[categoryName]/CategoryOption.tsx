"use client";

import { DynamicField } from "@/components/Form/DynamicField";
import { FileField } from "@/components/Form/FIleField";
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
import { Eye, Pen, Trash } from "lucide-react";
import Modal from "@/components/Modal";
import Link from "next/link";

type CategoryOptionProps = {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete id", id);
    setIsDeleting(true);

    const toastDeleteCategory = toast.loading("Loading...");

    // const deleteUrl = `/api/post?postId=${post.id}&imageId=${post.imageId}`;

    // const response = await fetch(deleteUrl, {
    //   method: "DELETE",
    // });

    const deleteUrl = `/api/admin/category`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteId: id }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Category Deleted", {
        id: toastDeleteCategory,
      });
      router.refresh();
      router.replace("/admin/categories");
      console.log("success", data);
    } else {
      toast.error("Something went wrong", {
        id: toastDeleteCategory,
      });
      console.log("error", data);
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const defaultValues = {
    name: name,
    imageUrl: imageUrl,
    imageId: imageId,
    quotes: quotes?.length ? quotes : [{ quote: "", author: "" }],
  };

  const formSchema = z.object({
    name: z.string().nonempty("Category is required"),
    imageUrl: z.string().nonempty("Image is required"),
    imageId: z.string().nonempty("Image is required"),
    quotes: z
      .array(
        z.object({
          id: z.string().optional(),
          quote: z.string().nonempty("Quote required"),
          author: z.string().nonempty("Quote author required"),
        })
      )
      // .nullable()
      .optional(),
  });

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValuesProps) => {
    // console.log(values);
    // return;

    setIsSubmitting(true);
    const toastCategoryAdd = toast.loading("Loading...");

    const url = `/api/admin/category?categoryId=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      form.reset();
      router.refresh();
      // await fetch(
      //   `/api/revalidate?path=${`/admin/categories/${data.response.name
      //     .split(" ")
      //     .join("_")
      //     .toLowerCase()}`}`
      // );
      toast.success("Category updated successfully", {
        id: toastCategoryAdd,
      });
      console.log("success", data);

      router.replace(`/admin/categories/${data.response.name.toLowerCase()}`);
      setShowEditModal(false);
    } else {
      toast.error(`${data.error}`, {
        id: toastCategoryAdd,
      });
      console.log("error", data);
    }

    setIsSubmitting(false);

    // router.push("/add-post/preview");
  };

  return (
    <>
      <DropdownMenu>
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
        {/* <AlertDialogTrigger asChild>
        <Button variant="default">Edit category</Button>
      </AlertDialogTrigger> */}
        <AlertDialogContent className="relative bg-gray-50 dark:bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
          <div className="">
            <button
              type="button"
              title="Close"
              className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end hover:scale-110 transition-transform duration-100 disabled:cursor-not-allowed"
              onClick={() => setShowEditModal(false)}
              disabled={isSubmitting}
            >
              <XCircleIcon className="w-7 h-7" />
            </button>

            <h1 className="text-2xl font-bold text-center">Edit category</h1>
            <ScrollArea className="">
              <div className="max-h-[650px] px-6">
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 mt-10"
                    noValidate
                  >
                    <InputField type="text" label="Category Name" name="name" />

                    <FileField label="Image" name="imageUrl" isAdmin />

                    {/* <DynamicField
               label="Quote"
              type="text"
              name="contactNo"
              optionName="number"
              maxLength={4} /> */}

                    <DynamicField
                      name="quotes"
                      optionNames={["quote", "author"]}
                      labels={["Quote", "Author"]}
                      type="text"
                      maxLength={20}
                    />

                    <div className="flex justify-between pt-4 gap-8">
                      <Button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        // className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
                        variant="outline"
                        className="w-full border-gray-700 dark:border-gray-400"
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isDeleting}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </ScrollArea>
          </div>
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
