"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function markEditorsChoice({ postId }: { postId: string }) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  if (!postId) {
    return { error: "Need to pass post id" };
  }

  try {
    const postResponse = await prisma.post.findFirst({
      where: {
        editorsChoice: true,
      },
    });

    if (postResponse?.id === postId) {
      return { error: "Already marked as editor's choice" };
    }

    if (postResponse?.id) {
      const removeEditorsChoice = await prisma.post.update({
        where: {
          id: postResponse?.id,
        },
        data: {
          editorsChoice: false,
          updatedAt: postResponse?.updatedAt,
        },
      });
    }

    const addEditorsChoiceResponse = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        editorsChoice: true,
        updatedAt: postResponse?.updatedAt,
      },
    });

    revalidatePath("/", "layout");
    revalidateTag("editorsChoice");

    return {
      success: `Post marked as editor's choice`,
      data: addEditorsChoiceResponse,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
