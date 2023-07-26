// import { CommentProps } from "@/typings";
import { Comment } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SingleComment({ singleComment }: { singleComment: Comment }) {
  const { id, comment, user } = singleComment;

  return (
    <div key={id} className="">
      <div className="flex gap-3 break-words">
        <div className="">
          {user?.profile?.imageUrl ? (
            <Image
              src={user.profile.imageUrl}
              alt={user.username}
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
              href={`/user/${user.username}`}
              className="hover:text-blue-800 dark:hover:text-blue-500"
            >
              {user.username}
            </Link>
          </p>
          <div className="">
            <p className="overflow-hidden break-words">{comment}</p>
          </div>
          <div className="relative">
            <div className="relative flex w-full justify-between items-center text-sm">
              {/* <div className="flex items-center gap-2">
                      <p className="text-gray-600 dark:text-gray-400 ml-16">
                        {getTimeDistance(comment.createdAt)}
                      </p>
                    </div> */}
            </div>
            {/* <PostCommentsReplies
                    commentReplies={comment.commentsReplies}
                  /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
