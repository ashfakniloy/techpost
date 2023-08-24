"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { ImageField } from "@/components/Form/ImageField";
import { RichTextField } from "@/components/Form/RichTextField";
import { PostFormProps, postSchema } from "@/schemas/postSchema";

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

  const router = useRouter();

  const form = useForm<PostFormProps>({
    defaultValues,
    resolver: zodResolver(postSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: PostFormProps) => {
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
          <ImageField label="Image" name="imageUrl" />
          <RichTextField label="Article" name="article" />
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-bold text-white bg-black rounded-md dark:text-black dark:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
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
