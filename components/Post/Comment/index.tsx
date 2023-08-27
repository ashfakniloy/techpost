import { getComments } from "@/db/queries/getComments";
import CommentForm from "./CommentForm";
import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/lib/next-auth";
import CommentLike from "./CommentLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import CommentReply from "./CommentReply";
import CommentOption from "./CommentOption";
import { Button } from "@/components/ui/button";

async function Comment({
  postId,
  authorId,
  slug,
  showCommentsParam,
}: {
  postId: string;
  authorId: string;
  slug: string;
  showCommentsParam: string;
}) {
  const session = await getAuthSession();

  const addComments = 5;

  const showComments = Number(showCommentsParam) || addComments;

  const showCommentsIncrement = showComments + addComments;

  const { data: comments, count: totalComments } = await getComments({
    postId,
    take: showComments,
  });
  // const totalComments = data.commentsCount;
  // const comments = data.comments;

  // console.log("comments", comments);

  return (
    <div id="comments" className="min-w-[296px] max-w-[401px] lg:max-w-[716px]">
      {session && session.user.role === "USER" ? (
        <CommentForm postId={postId} />
      ) : (
        <Link href="/signin" className="text-blue-600 dark:text-blue-400 link">
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

        <div className="mt-2 space-y-5">
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
                <div className="flex-1 w-[10%] text-sm lg:text-base">
                  <p className="font-semibold text-xs lg:text-sm">
                    <Link
                      href={`/user/${comment.user.username}`}
                      className="link"
                    >
                      {comment.user.username}
                    </Link>
                  </p>
                  <div className="mt-1">
                    <p className="overflow-hidden break-words">
                      {comment.comment}
                    </p>
                  </div>

                  <div className="mt-1 relative flex w-full justify-between items-center text-xs lg:text-sm">
                    <div className="relative flex justify-between items-center w-full lg:max-w-[280px]">
                      <CommentLike commentId={comment.id} />

                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 dark:text-gray-400">
                          {getTimeDistance(comment.createdAt)}
                        </p>
                      </div>
                    </div>

                    {(session?.user.id === comment.userId ||
                      session?.user.id === authorId) && (
                      <CommentOption commentId={comment.id} type="Comment" />
                    )}
                  </div>
                </div>
              </div>

              <CommentReply
                commentId={comment.id}
                postId={postId}
                authorId={authorId}
                session={session}
              />
            </div>
          ))}
        </div>

        {comments.length !== totalComments && (
          <div className="flex justify-center mt-3">
            <Link
              href={`/post/${slug}?showComments=${showCommentsIncrement}`}
              scroll={false}
              replace={true}
            >
              <Button
                type="button"
                size="sm"
                className="px-6 rounded-full"
                aria-label="more comments"
              >
                {`Show ${
                  totalComments - comments.length < addComments
                    ? totalComments - comments.length
                    : addComments
                } more ${
                  totalComments - comments.length > 1 ? "comments" : "comment"
                }`}
              </Button>
            </Link>

            {/* <Link
              href={`/post/${slug}?showComments=${showCommentsIncrement}`}
              scroll={false}
              replace={true}
              className="px-6 py-2 rounded-full text-sm font-bold bg-gray-800 text-white dark:text-black dark:bg-gray-100"
            >
              {`Show ${
                totalComments - comments.length < addComments
                  ? totalComments - comments.length
                  : addComments
              } more ${
                totalComments - comments.length > 1 ? "comments" : "comment"
              }`}
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
