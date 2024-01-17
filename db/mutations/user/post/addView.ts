"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function addView({ postId }: { postId: string }) {
  const session = await getAuthSession();

  if (session?.user.role === "ADMIN") return;

  const deviceId = cookies().get("deviceId")?.value;

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  if (typeof deviceId !== "string") {
    return { error: "Invalid deviceId" };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return { error: "Post not found" };
  }

  const isViewed = await prisma.view.findUnique({
    where: {
      postId_deviceId: {
        postId: postId,
        deviceId: deviceId,
      },
    },
  });

  if (isViewed) return;

  try {
    await prisma.view.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        deviceId: deviceId,
      },
    });

    revalidateTag("counts");

    return { success: "Post view added" };
  } catch (error) {
    console.log(error);
    return { error: "View error", data: error };
  }
}
