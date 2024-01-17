"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/Form/InputField";
import { SelectField } from "@/components/Form/SelectField";
import { ImageField } from "@/components/Form/ImageField";
import { Button } from "@/components/ui/button";
import { RichTextField } from "@/components/Form/RichTextField";
import { PostFormProps, postSchema } from "@/schemas/postSchema";
import { editPost } from "@/db/mutations/user/post/editPost";

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

  // // with server action
  const onSubmit = async (values: PostFormProps) => {
    const toastEditPost = toast.loading("Loading...");

    const result = await editPost({ values: values, postId: post.id });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastEditPost,
      });

      const slug = result.data.slug;

      router.push(`/post/${slug}`);
    } else if (result.error) {
      toast.error(result.error, {
        id: toastEditPost,
      });
    } else {
      toast.error("Error", {
        id: toastEditPost,
      });
    }
  };

  // // with route handler
  // const onSubmit = async (values: PostFormProps) => {
  //   const toastEditPost = toast.loading("Loading...");

  //   const url = `/api/post?postId=${post.id}`;
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   const data = await response.json();
  //   const slug = data?.response?.slug;

  //   if (response.ok) {
  //     console.log("success", data);
  //     toast.success(data.success, {
  //       id: toastEditPost,
  //     });
  //     revalidateAllRoutes();
  //     // router.refresh();
  //     router.push(`/post/${slug}`);
  //   } else {
  //     console.log("error", data);
  //     toast.error(data.error, {
  //       id: toastEditPost,
  //     });
  //   }
  // };

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
            <Button
              type="submit"
              className="min-w-[120px]"
              aria-label="publish edited post"
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditPostForm;
