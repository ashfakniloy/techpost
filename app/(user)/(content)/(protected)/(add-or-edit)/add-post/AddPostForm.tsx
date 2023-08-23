"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { FileField } from "@/components/Form/FIleField";
import { RichTextField } from "@/components/Form/RichTextField";

function AddPostForm({ categories }: { categories: string[] }) {
  const router = useRouter();

  const defaultValues = {
    title: "",
    categoryName: "",
    imageUrl: "",
    imageId: "",
    article: "",
  };

  const formSchema = z
    .object({
      title: z
        .string()
        .nonempty("Title is required")
        .min(5, "Title must be at least 5 characters")
        .max(150, "Title must be at most 150 characters"),
      categoryName: z.string().nonempty("Category is required"),
      imageUrl: z.string().nonempty("Image is required"),
      imageId: z.string().nonempty("Image is required"),
      article: z.string().nonempty("Article is required"),
    })
    .refine((value) => value.article !== "<p></p>", {
      message: "Article is required",
      path: ["article"],
    });

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { watch, setValue, reset } = form;

  const hasDraft = Object.values(form.watch()).some(
    (value) => value !== "" && value !== "<p></p>"
  );

  const { clear: clearDraft } = useFormPersist("draftPost", {
    watch,
    setValue,
    storage: typeof window !== "undefined" ? window.localStorage : undefined, // default window.sessionStorage
  });

  const handleClear = () => {
    clearDraft();
    reset();
  };

  const onSubmit = (values: FormValuesProps) => {
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
          <FileField label="Image" name="imageUrl" />
          <RichTextField label="Article" name="article" />
          <div className="flex items-center gap-5 justify-end pt-4">
            {hasDraft && (
              <button
                type="button"
                className="px-4 py-2.5 text-sm font-bold text-white bg-black rounded-md dark:text-black dark:bg-white"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-bold text-white bg-black rounded-md dark:text-black dark:bg-white"
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
