import { CommentTypes, getComments } from "@/db/queries/getComments";
import Image from "next/image";
import Link from "next/link";
import { repliesColumn } from "@/components/Admin/DataTable/components/columns/repliesColumn";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import { commentsColumn } from "@/components/Admin/DataTable/components/columns/commentsColumn";
import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { commentLikesColumn } from "@/components/Admin/DataTable/components/columns/commentLikesColumn";
import Section from "@/components/Admin/Section";

function SingleComment({ comment }: { comment: CommentTypes }) {
  const imageSrc = comment.user.profile?.imageUrl
    ? comment.user.profile.imageUrl
    : "/images/blankUser.jpg";

  return (
    <div className="flex gap-3">
      <div>
        <Image
          src={imageSrc}
          alt={comment.user.username}
          width={35}
          height={35}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">
          <Link
            href={`/admin/users/${comment.user.username}`}
            className="capitalize link"
          >
            {comment.user.username}
          </Link>
        </p>
        <div className="max-w-[580px]">
          <p>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
}

async function PostComments({
  postId,
  slug,
  showLikes,
  showReplies,
}: {
  postId: string;
  slug: string;
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
            <Link href={`/admin/posts/${slug}`} scroll={false} replace={true}>
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
