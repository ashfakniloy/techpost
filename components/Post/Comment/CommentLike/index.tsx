import Image from "next/image";
import Link from "next/link";
import CommentLikeButton from "./CommentLikeButton";
import { getAuthSession } from "@/lib/next-auth";
import { getCommentLikes } from "@/db/queries/getCommentsLikes";

async function CommentLike({ commentId }: { commentId: string }) {
  const { data: commentsLikes, count: commentLikesCount } =
    await getCommentLikes({ commentId });

  const session = await getAuthSession();

  const hasLiked = commentsLikes.some(
    (like: any) => like.userId === session?.user.id
  );

  return (
    <CommentLikeButton
      commentId={commentId}
      hasLiked={hasLiked}
      session={session}
      likesCount={commentLikesCount}
    >
      <div className="border-t border-gray-300 dark:border-gray-600 overflow-hidden max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50 ">
        {commentsLikes?.map((like) => (
          <Link key={like.id} href={`/user/${like.user.username}`}>
            <div
              className={`w-full flex items-center gap-2 p-2 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 ${
                like.userId === session?.user.id ? "text-blue-400" : ""
              }`}
            >
              <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden">
                {like.user.profile?.imageUrl ? (
                  <Image
                    src={like.user.profile.imageUrl}
                    alt="user image"
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
              <span className="capitalize">{like.user.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </CommentLikeButton>
  );
}

export default CommentLike;
