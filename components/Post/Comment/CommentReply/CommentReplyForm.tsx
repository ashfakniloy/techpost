"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { TextAreaField } from "@/components/Form/TextAreaField";

function CommentsReplyForm({
  postId,
  commentId,
  setOpenReplyForm,
  setShowReplies,
}: {
  postId: string;
  commentId: string;
  setOpenReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const defaultValues = {
    commentReply: "",
  };
  const formSchema = z.object({
    commentReply: z.string().nonempty("Comment Reply is required"),
  });

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValuesProps) => {
    // console.log("values", values.commentReply, postId);
    // return;
    const { commentReply } = values;
    const response = await fetch(`/api/post/comment/commentReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentReply, postId, commentId }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowReplies(true);
      toast.success("CommentReply Submitted");
      reset();
      router.refresh();
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
          <TextAreaField name="commentReply" placeholder="Write a reply" />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              aria-label="cancel"
              className="self-end px-6 py-2 rounded-md text-sm min-w-[100px] text-white font-bold bg-gray-600 dark:bg-gray-500 "
              onClick={() => setOpenReplyForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="self-end px-6 py-2 text-sm font-bold  min-w-[100px] tracking-wider text-gray-100 bg-gray-900 rounded-md dark:bg-gray-50 dark:text-gray-900 disabled:bg-opacity-70 dark:disabled:bg-opacity-70 disabled:cursor-not-allowed"
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

export default CommentsReplyForm;
