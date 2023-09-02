import { getCommentReplies } from "@/db/queries/getCommentReplies";
import Link from "next/link";
import Image from "next/image";
import { getTimeDistance } from "@/utils/getTimeDistance";
import ReplyWrapper from "./ReplyWrapper";
import CommentOption from "../CommentOption";
import type { Session } from "next-auth";

async function CommentReply({
  commentId,
  postId,
  authorId,
  session,
}: {
  commentId: string;
  postId: string;
  authorId: string;
  session: Session | null;
}) {
  const { count: commentRepliesCount, data: commentReplies } =
    await getCommentReplies({ commentId });

  return (
    <ReplyWrapper
      commentId={commentId}
      postId={postId}
      commentRepliesCount={commentRepliesCount}
    >
      {commentReplies.map((reply, i) => (
        <div key={reply.id} className="flex gap-3 pt-4">
          <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden">
            {reply.user.profile?.imageUrl ? (
              <Image
                src={reply.user.profile.imageUrl}
                alt={reply.user.username}
                fill
                sizes="30px"
                className="object-cover"
              />
            ) : (
              <Image
                src="/images/blankUser.jpg"
                alt="user image"
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
          </div>

          <div className="flex-1 w-[10%] text-sm lg:text-base">
            <p className="text-xs lg:text-sm font-semibold">
              <Link
                href={`/user/${reply.user.username}`}
                className="capitalize link"
              >
                {reply.user.username}
              </Link>
            </p>
            <div className="overflow-hidden break-words">
              <p>{reply.commentReply}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  {getTimeDistance(reply.createdAt)}
                </p>
                {(session?.user.id === reply.userId ||
                  session?.user.id === authorId) && (
                  <CommentOption commentReplyId={reply.id} type="Reply" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </ReplyWrapper>
  );
}

export default CommentReply;
