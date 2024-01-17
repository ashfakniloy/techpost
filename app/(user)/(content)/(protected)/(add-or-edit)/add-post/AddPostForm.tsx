"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { ImageField } from "@/components/Form/ImageField";
import { RichTextField } from "@/components/Form/RichTextField";
import { useState } from "react";
import { Loader } from "@/components/Loaders/Loader";
import { PostFormProps, postSchema } from "@/schemas/postSchema";
import { Button } from "@/components/ui/button";

function AddPostForm({ categories }: { categories: string[] }) {
  const defaultValues = {
    title: "",
    categoryName: "",
    imageUrl: "",
    imageId: "",
    article: "",
  };

  const router = useRouter();

  const [isClearing, setIsClearing] = useState(false);

  const form = useForm<PostFormProps>({
    defaultValues,
    resolver: zodResolver(postSchema),
  });

  const { watch, setValue, reset, getValues } = form;

  const hasDraft = Object.values(form.watch()).some(
    (value) => value !== "" && value !== "<p></p>"
  );

  useFormPersist("draftPost", {
    watch,
    setValue,
    storage: typeof window !== "undefined" ? window.localStorage : undefined, // default window.sessionStorage
  });

  const imageIdValue = getValues("imageId");

  const deleteImage = async () => {
    const response = await fetch(`/api/image?imageId=${imageIdValue}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
      console.log("success image delete", data);
    } else {
      console.log("error image delete", data);
    }
  };

  const handleClear = async () => {
    setIsClearing(true);
    imageIdValue && (await deleteImage());
    reset();
    setIsClearing(false);
  };

  const onSubmit = (values: PostFormProps) => {
    console.log(values);
    router.push("/add-post/preview");
  };

  return (
    <div className="relative">
      <div className="mb-5 flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center">
        <h4 className="flex-1 text-[22px] lg:text-2xl text-center lg:text-start font-montserrat font-extrabold text-gray-700 dark:text-gray-400 capitalize">
          Add New Post
        </h4>
        <p className="text-[12px] flex-1">
          * Your post is auto-saved when typing. Feel free to take your time,
          write at your own pace, and your work will be safe for later
          publishing
        </p>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <InputField type="text" label="Title" name="title" />
          <SelectField
            name="categoryName"
            label="Category"
            placeholder="Select Category"
            options={categories}
          />
          <ImageField label="Image" name="imageUrl" />
          <RichTextField label="Article" name="article" />
          <div className="flex items-center gap-6 justify-end pt-4">
            {hasDraft && (
              <Button
                type="button"
                variant="outline"
                className="relative min-w-[120px] border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={handleClear}
                disabled={isClearing}
                aria-label="clear post"
              >
                {isClearing && (
                  <span className="absolute flex left-[8px] items-center inset-y-0">
                    <Loader width="25" />
                  </span>
                )}
                <span>Clear</span>
              </Button>
            )}

            <Button className="min-w-[120px]" aria-label="preview post">
              Preview
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default AddPostForm;
