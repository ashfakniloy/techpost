"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { FileField } from "@/components/Form/FIleField";
import { RichTextField } from "@/components/Form/RichTextField";

type Props = {
  id: string;
  title: string;
  categoryName: string;
  imageUrl: string;
  imageId: string;
  article: string;
};

function EditPostForm({
  post,
  categories,
}: {
  post: Props;
  categories: string[];
}) {
  const defaultValues = {
    title: post.title,
    categoryName: post.categoryName,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
    article: post.article,
  };

  const formSchema = z.object({
    title: z
      .string()
      .nonempty("Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title must be at most 150 characters"),
    categoryName: z.string().nonempty("Category is required"),
    imageUrl: z.string().nonempty("Image is required"),
    imageId: z.string().nonempty("Image is required"),
    article: z.string().nonempty("Article is required"),
  });

  const router = useRouter();

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValuesProps) => {
    const toastEditPost = toast.loading("Loading...");

    const url = `/api/post?postId=${post.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    const slug = data?.response?.slug;

    if (response.ok) {
      console.log("success", data);
      toast.success("Post updated successfully", {
        id: toastEditPost,
      });
      // router.refresh();
      router.push(`/post/${slug}`);
    } else {
      console.log("error", data);
      toast.error("Something went wrong", {
        id: toastEditPost,
      });
    }
  };

  return (
    <div className="overflow-hidden">
      <h4 className="mb-5 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400 ">
        {`Edit post "${post.title}"`}
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
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-bold text-white bg-black rounded-md dark:text-black dark:bg-white"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditPostForm;
