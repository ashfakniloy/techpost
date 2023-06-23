import { getComments } from "@/prisma/find/getComments";
import CommentForm from "./CommentForm";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import CommentLike from "./CommentLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import CommentRepliesList from "./CommentReply";
import CommentReply from "./CommentReply";
import CommentOption from "./CommentOption";
import CommentWrapper from "./CommentWrapper";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Comment({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) {
  const session = await getServerSession(authOptions);

  const { data: comments, count: totalComments } = await getComments({
    postId,
  });
  // const totalComments = data.commentsCount;
  // const comments = data.comments;

  // console.log("comments", comments);

  return (
    // <CommentWrapper>
    <div id="comments" className="min-w-[296px] max-w-[401px] lg:max-w-[716px]">
      {session ? (
        <CommentForm postId={postId} />
      ) : (
        <Link href="/signin" className="text-blue-500">
          Sign in to comment
        </Link>
      )}
      <div className="mt-3">
        <p className="">
          {totalComments > 0
            ? totalComments > 1
              ? `${totalComments} comments`
              : `${totalComments} comment`
            : "No comments yet"}
        </p>

        <div className="mt-2 space-y-5 ">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2"
            >
              <div className="flex gap-3 break-words">
                <div className="">
                  {comment.user.profile?.imageUrl ? (
                    <Image
                      src={comment.user.profile.imageUrl}
                      alt={comment.user.username}
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src="/images/blankUser.jpg"
                      alt="user image"
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  )}
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
                    <p className="overflow-hidden break-words">
                      {comment.comment}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative flex w-full justify-between items-center text-sm">
                      <CommentLike commentId={comment.id} />

                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 dark:text-gray-400 ml-16">
                          {getTimeDistance(comment.createdAt)}
                        </p>
                      </div>

                      {(session?.user.id === comment.userId ||
                        session?.user.id === authorId) && (
                        <div className="">
                          <CommentOption
                            commentId={comment.id}
                            type="Comment"
                          />
                        </div>
                      )}
                    </div>

                    <CommentReply
                      commentId={comment.id}
                      postId={postId}
                      authorId={authorId}
                      session={session}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center mt-3">
          <button className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50">
            View more comments
          </button>
        </div> */}
      </div>
    </div>
    // </CommentWrapper>
  );
}

export default Comment;
