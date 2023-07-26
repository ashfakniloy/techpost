// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { CommentTypes, getComments } from "@/prisma/find/getComments";
// import { getFormatedDate } from "@/utils/getFormatedDate";
// import { getTimeDistance } from "@/utils/getTimeDistance";
// import Image from "next/image";
// import Link from "next/link";
// import { repliesColumn } from "@/components/Admin/DataTable/components/columns/repliesColumn";
// import { DataTable } from "@/components/Admin/DataTable/components/data-table";
// import { commentsColumn } from "@/components/Admin/DataTable/components/columns/commentsColumn";
// import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
// import { likesColumns } from "@/components/Admin/DataTable/components/columns/likesColumn";

// function SingleComment({ comment }: { comment: CommentTypes }) {
//   const imageSrc = comment.user.profile?.imageUrl
//     ? comment.user.profile.imageUrl
//     : "/images/blankUser.jpg";

//   return (
//     <div className="flex gap-3 break-words">
//       <div className="">
//         <Image
//           src={imageSrc}
//           alt={comment.user.username}
//           width={35}
//           height={35}
//           className="rounded-full"
//         />
//       </div>
//       <div className="flex-1 w-[10%]">
//         <p className="text-sm font-semibold">
//           <Link
//             href={`/user/${comment.user.username}`}
//             className="hover:text-blue-800 dark:hover:text-blue-500"
//           >
//             {comment.user.username}
//           </Link>
//         </p>
//         <div className="">
//           <p className="overflow-hidden break-words">{comment.comment}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// async function PostComments({
//   postId,
//   showLikes,
//   showReplies,
// }: {
//   postId: string;
//   showLikes: string;
//   showReplies: string;
// }) {
//   const { data: comments, count: totalComments } = await getComments({
//     postId,
//   });

//   // console.log("comments", comments);

//   const selectedComment = comments.find(
//     (comment) => comment.id === showReplies
//   );

//   console.log("selectedComment", selectedComment?.commentsLikes);

//   const cardTitle = showLikes ? (
//     <span className="flex items-center gap-2">
//       <ChevronDoubleRightIcon className="h-4 w-4" /> <span>Likes</span>
//     </span>
//   ) : showReplies ? (
//     <span className="flex items-center gap-2">
//       <ChevronDoubleRightIcon className="h-4 w-4" /> <span>Replies</span>
//     </span>
//   ) : (
//     ""
//   );

//   return (
//     <div className="bg-custom-gray6 p-6 rounded-lg min-h-[240px] w-full">
//       <h3 className="text-xl font-semibold flex items-center gap-2">
//         Post Comments {cardTitle}
//       </h3>

//       <div className="mt-5">
//         {comments.length ? (
//           // <DataTable
//           //   columns={commentsColumn}
//           //   data={comments}
//           //   searchBy="username"
//           // />
//           showReplies ? (
//             <div className="text-sm">
//               <Link
//                 href={`/admin/posts/${postId}`}
//                 scroll={false}
//                 replace={true}
//               >
//                 {"< "}Back
//               </Link>
//               {selectedComment && (
//                 <div className="mt-5">
//                   <SingleComment comment={selectedComment} />

//                   <div className="mt-5">
//                     <DataTable
//                       columns={repliesColumn}
//                       data={selectedComment.commentsReplies}
//                       searchBy="username"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : showLikes ? (
//             <div className="text-sm">
//               <Link
//                 href={`/admin/posts/${postId}`}
//                 scroll={false}
//                 replace={true}
//               >
//                 {"< "}Back
//               </Link>
//               {selectedComment && (
//                 <div className="mt-5">
//                   <SingleComment comment={selectedComment} />

//                   <div className="mt-5">
//                     <DataTable
//                       columns={likesColumns}
//                       data={selectedComment.commentsLikes}
//                       searchBy="username"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <DataTable
//               columns={commentsColumn}
//               data={comments}
//               searchBy="username"
//             />
//           )
//         ) : (
//           // <div className="mt-2 space-y-5 ">
//           //   {comments.map((comment) => (
//           //     <div key={comment.id} className="">
//           //       <div className="flex gap-3 break-words">
//           //         <div className="">
//           //           {comment.user.profile?.imageUrl ? (
//           //             <Image
//           //               src={comment.user.profile.imageUrl}
//           //               alt={comment.user.username}
//           //               width={35}
//           //               height={35}
//           //               className="rounded-full"
//           //             />
//           //           ) : (
//           //             <Image
//           //               src="/images/blankUser.jpg"
//           //               alt="user image"
//           //               width={35}
//           //               height={35}
//           //               className="rounded-full"
//           //             />
//           //           )}
//           //         </div>
//           //         <div className="flex-1 w-[10%]">
//           //           <p className="text-sm font-semibold">
//           //             <Link
//           //               href={`/user/${comment.user.username}`}
//           //               className="hover:text-blue-800 dark:hover:text-blue-500"
//           //             >
//           //               {comment.user.username}
//           //             </Link>
//           //           </p>
//           //           <div className="">
//           //             <p className="overflow-hidden break-words">
//           //               {comment.comment}
//           //             </p>
//           //           </div>
//           //           <div className="relative">
//           //             <div className="relative flex w-full justify-between items-center text-sm">
//           //               {/* <CommentLike commentId={comment.id} /> */}

//           //               <div className="flex items-center gap-2">
//           //                 <p className="text-gray-600 dark:text-gray-400 ml-16">
//           //                   {getTimeDistance(comment.createdAt)}
//           //                 </p>
//           //               </div>

//           //               {/* {(session?.user.id === comment.userId ||
//           //               session?.user.id === authorId) && (
//           //               <div className="">
//           //                 <CommentOption
//           //                   commentId={comment.id}
//           //                   type="Comment"
//           //                 />
//           //               </div>
//           //             )} */}
//           //             </div>
//           //             <PostCommentsReplies
//           //               commentReplies={comment.commentsReplies}
//           //             />

//           //             {/* <CommentReply
//           //             commentId={comment.id}
//           //             postId={postId}
//           //             authorId={authorId}
//           //             session={session}
//           //           /> */}
//           //           </div>
//           //         </div>
//           //       </div>
//           //       <Separator className="my-4 bg-gray-500" />
//           //     </div>
//           //   ))}
//           // </div>
//           <p className="pt-10 text-center text-xl text-red-600">
//             No comments found
//           </p>
//         )}
//       </div>

//       {/* <div className="mt-5">
//         {likes.length ? (
//           <DataTableBasic
//             columns={likesColumns}
//             data={likes}
//             searchBy="username"
//           />
//         ) : (
//           <p className="pt-10 text-center text-xl text-red-600">
//             No comments found
//           </p>
//         )}
//       </div> */}
//     </div>
//   );
// }

// export default PostComments;

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CommentTypes, getComments } from "@/prisma/find/getComments";
import { getFormatedDate } from "@/utils/getFormatedDate";
import { getTimeDistance } from "@/utils/getTimeDistance";
import Image from "next/image";
import Link from "next/link";
import { repliesColumn } from "@/components/Admin/DataTable/components/columns/repliesColumn";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import { commentsColumn } from "@/components/Admin/DataTable/components/columns/commentsColumn";
import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { likesColumns } from "@/components/Admin/DataTable/components/columns/likesColumn";
import { commentLikesColumn } from "@/components/Admin/DataTable/components/columns/commentLikesColumn";
import Section from "@/components/Admin/Section";

function SingleComment({ comment }: { comment: CommentTypes }) {
  const imageSrc = comment.user.profile?.imageUrl
    ? comment.user.profile.imageUrl
    : "/images/blankUser.jpg";

  return (
    <div className="flex gap-3 break-words">
      <div className="">
        <Image
          src={imageSrc}
          alt={comment.user.username}
          width={35}
          height={35}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 w-[10%]">
        <p className="text-sm font-semibold">
          <Link
            href={`/user/${comment.user.username}`}
            className="hover:text-blue-800 dark:hover:text-blue-500"
          >
            {comment.user.username}
          </Link>
        </p>
        <div className="">
          <p className="overflow-hidden break-words">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
}

async function PostComments({
  postId,
  showLikes,
  showReplies,
}: {
  postId: string;
  showLikes: string;
  showReplies: string;
}) {
  const { data: comments, count: totalComments } = await getComments({
    postId,
  });

  // console.log("comments", comments);

  const selectedComment = comments.find(
    (comment) => comment.id === showReplies || comment.id === showLikes
  );

  // const selectedComment =  comments.find(
  //   (comment) => showReplies && comment.id === showReplies || showLikes && comment.id === showLikes
  // );

  // const selectedComment = showReplies && comments.find(
  //   (comment) => comment.id === showReplies
  // ) || showLikes && comments.find(
  //   (comment) =>  comment.id === showLikes
  // );

  console.log("selectedComment", selectedComment?.commentsLikes);

  const cardTitle = showLikes ? (
    <span className="flex items-center gap-2">
      Post Comments
      <ChevronDoubleRightIcon className="h-4 w-4" /> <span>Likes</span>
    </span>
  ) : showReplies ? (
    <span className="flex items-center gap-2">
      Post Comments
      <ChevronDoubleRightIcon className="h-4 w-4" /> <span>Replies</span>
    </span>
  ) : (
    "Post Comments"
  );

  return (
    <Section title={cardTitle} className="min-h-[240px] space-y-3">
      {comments.length ? (
        selectedComment ? (
          <div className="text-sm">
            <Link href={`/admin/posts/${postId}`} scroll={false} replace={true}>
              <button type="button">
                <span className="flex items-center gap-1.5 group">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="group-hover:underline">Back</span>
                </span>
              </button>
            </Link>

            <div className="mt-5">
              <SingleComment comment={selectedComment} />

              <div className="mt-5">
                {showReplies && (
                  <DataTable
                    columns={repliesColumn}
                    data={selectedComment.commentsReplies}
                    searchBy="username"
                    disableSearch
                    deleteUrl="/api/admin/post/comment/reply"
                  />
                )}
                {showLikes && (
                  <DataTable
                    columns={commentLikesColumn}
                    data={selectedComment.commentsLikes}
                    searchBy="username"
                    disableRowSelect
                    disableSearch
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <DataTable
            columns={commentsColumn}
            data={comments}
            searchBy="username"
            disableSearch
            deleteUrl="/api/admin/post/comment"
          />
        )
      ) : (
        <p className="pt-10 text-center text-xl text-red-600">
          No comments found
        </p>
      )}
    </Section>
  );
}

export default PostComments;
