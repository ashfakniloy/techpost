"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { TextAreaField } from "@/components/Form/TextAreaField";
import { Button } from "@/components/ui/button";
import { CommentReplyProps, commentReplySchema } from "@/schemas/commentSchema";
import { addCommentReply } from "@/db/mutations/user/post/addCommentReply";

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
  const defaultValues = {
    commentReply: "",
  };

  const form = useForm<CommentReplyProps>({
    defaultValues,
    resolver: zodResolver(commentReplySchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  // with server action
  const onSubmit = async (values: CommentReplyProps) => {
    // console.log("values", values.commentReply, postId);
    // return;
    const result = await addCommentReply({ values, commentId, postId });

    console.log("result", result);

    if (result.success) {
      setShowReplies(true);
      toast.success(result.success);
      reset();
    } else if (result.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <TextAreaField name="commentReply" placeholder="Write a reply" />
          <div className="flex justify-end gap-6">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-w-[100px] border-gray-500"
              onClick={() => setOpenReplyForm(false)}
              aria-label="cancel"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="sm"
              className="min-w-[100px]"
              aria-label="submit reply"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CommentsReplyForm;

// // with route handler
// "use client";

// import { useRouter } from "next/navigation";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import { TextAreaField } from "@/components/Form/TextAreaField";
// import { CommentReplyProps, commentReplySchema } from "@/schemas/commentSchema";
// import { Button } from "@/components/ui/button";

// function CommentsReplyForm({
//   postId,
//   commentId,
//   setOpenReplyForm,
//   setShowReplies,
// }: {
//   postId: string;
//   commentId: string;
//   setOpenReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
//   setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const router = useRouter();

//   const defaultValues = {
//     commentReply: "",
//   };

//   const form = useForm<CommentReplyProps>({
//     defaultValues,
//     resolver: zodResolver(commentReplySchema),
//   });

//   const {
//     reset,
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: CommentReplyProps) => {
//     // console.log("values", values.commentReply, postId);
//     // return;
//     const { commentReply } = values;
//     const response = await fetch(`/api/post/comment/commentReply`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ commentReply, postId, commentId }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setShowReplies(true);
//       toast.success("Reply Submitted");
//       reset();
//       router.refresh();
//     } else {
//       toast.error(`${data.error}`);
//       console.log(data);
//     }
//   };

//   return (
//     <div>
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-5"
//           noValidate
//         >
//           <TextAreaField name="commentReply" placeholder="Write a reply" />
//           <div className="flex justify-end gap-6">
//             <Button
//               type="button"
//               size="sm"
//               variant="outline"
//               className="min-w-[100px] border-gray-500"
//               onClick={() => setOpenReplyForm(false)}
//               aria-label="cancel"
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               size="sm"
//               className="min-w-[100px]"
//               aria-label="submit reply"
//               disabled={isSubmitting}
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// export default CommentsReplyForm;
