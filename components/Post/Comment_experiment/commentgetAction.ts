"use server";

import { getComments } from "@/prisma/find/getComments";

export async function commentgetAction({
  postId,
  take,
}: {
  postId: string;
  take: number;
}) {
  const { count, data } = await getComments({ postId });

  return { count, data };
}
