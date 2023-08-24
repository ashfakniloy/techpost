"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { TextAreaField } from "@/components/Form/TextAreaField";
import { CommentFormProps, commentSchema } from "@/schemas/commentSchema";

function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();

  const defaultValues = {
    comment: "",
  };

  const form = useForm<CommentFormProps>({
    defaultValues,
    resolver: zodResolver(commentSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CommentFormProps) => {
    // console.log("values", values.comment, postId);
    // return;
    const { comment } = values;
    const response = await fetch(`/api/post/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, postId }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Comment Submitted");
      reset();
      router.refresh();
      console.log("success", data);
    } else {
      toast.error(`${data.error}`);
      console.log(data);
    }
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
          noValidate
        >
          <TextAreaField
            label="Comment"
            name="comment"
            placeholder="Write Comment"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 font-bold text-sm rounded-md tracking-wider bg-gray-900 text-gray-100 dark:bg-gray-50 dark:text-gray-900 disabled:bg-opacity-70 dark:disabled:bg-opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Post
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CommentForm;
