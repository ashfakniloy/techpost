"use server";

import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function likeAction({
  postId,
  session,
}: {
  postId: string | undefined;
  session: Session | null;
}) {
  // console.log("postId", postId);

  //not working.bug expected to be fixed soon from next js
  // const session = await getAuthSession();

  if (!session) return;

  if (typeof postId !== "string") return;

  try {
    const response = await prisma.like.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        post: {
          select: {
            likes: true,
          },
        },
      },
    });

    // revalidatePath("/");

    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function unlikeAction({
  postId,
  session,
}: {
  postId: string | undefined;
  session: Session | null;
}) {
  console.log("postId", postId);

  // const session = await getAuthSession();

  if (!session) return;

  if (typeof postId !== "string") return;

  try {
    const response = await prisma.like.delete({
      where: {
        postId_userId: {
          userId: session.user.id,
          postId: postId,
        },
      },
      select: {
        post: {
          select: {
            likes: true,
          },
        },
      },
    });

    // console.log("rspns", response);

    // const filteredRes = response.post.likes.filter(
    //   (like) => like.userId !== session.user.id
    // );

    // revalidatePath("/");

    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
