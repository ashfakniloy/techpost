"use server";

import { getCommentReplies } from "@/prisma/find/getCommentReplies";

export async function commentRepliesGetAction({
  commentId,
}: {
  commentId: string;
}) {
  const { count: commentRepliesCount, data: commentReplies } =
    await getCommentReplies({ commentId });

  return { commentRepliesCount, commentReplies };
}
