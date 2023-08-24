"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { ImageField } from "@/components/Form/ImageField";
import { RichTextField } from "@/components/Form/RichTextField";
import { useState } from "react";
import { Loader2 } from "@/components/Loaders/Loader";
import { PostFormProps, postSchema } from "@/schemas/postSchema";

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

  // const { clear: clearDraft } = useFormPersist("draftPost", {
  //   watch,
  //   setValue,
  //   storage: typeof window !== "undefined" ? window.localStorage : undefined, // default window.sessionStorage
  // });

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
      <h4 className="mb-5 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
        Add New post
      </h4>

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
              <button
                type="button"
                className="relative min-w-[120px] py-[9px] hover:text-white dark:hover:text-gray-900 border border-gray-800 dark:border-gray-200 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 rounded-md text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleClear}
                disabled={isClearing}
              >
                {isClearing && (
                  <span className="absolute flex left-[8px] items-center inset-y-0">
                    <Loader2 width="25" />
                  </span>
                )}
                <span>Clear</span>
              </button>
            )}
            <button
              type="submit"
              className="min-w-[120px] py-2.5 text-sm font-bold text-white bg-gray-900 rounded-md dark:text-gray-900 dark:bg-white"
            >
              Preview
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default AddPostForm;
