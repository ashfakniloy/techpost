"use client";

import { DynamicField } from "@/components/Form/DynamicField";
import { FileField } from "@/components/Form/FIleField";
import { InputField } from "@/components/Form/InputField";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

function AddCategory() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const defaultValues = {
    name: "",
    imageUrl: "",
    imageId: "",
    quotes: [{ quote: "", author: "" }],
  };

  const formSchema = z.object({
    name: z.string().nonempty("Category is required"),
    imageUrl: z.string().nonempty("Image is required"),
    imageId: z.string().nonempty("Image is required"),
    quotes: z
      .array(
        z.object({
          quote: z.string().nonempty("Quote required"),
          author: z.string().nonempty("Quote author required"),
        })
      )
      // .nullable()
      .optional(),
  });

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValuesProps) => {
    // console.log(values);
    // return;
    setIsSubmitting(true);
    const toastCategoryAdd = toast.loading("Loading...");

    const url = "/api/admin/category";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Category created successfully", {
        id: toastCategoryAdd,
      });
      console.log("success", data);

      form.reset();
      router.refresh();
      setShowModal(false);
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
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogTrigger asChild>
        <Button variant="default">Add category</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="relative bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
        <div className="">
          <button
            type="button"
            className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end disabled:cursor-not-allowed"
            onClick={() => setShowModal(false)}
            disabled={isSubmitting}
          >
            <XCircleIcon className="w-7 h-7" />
          </button>

          <h1 className="text-2xl font-bold text-center">Add new category</h1>
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
                      onClick={() => setShowModal(false)}
                      className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </ScrollArea>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddCategory;
