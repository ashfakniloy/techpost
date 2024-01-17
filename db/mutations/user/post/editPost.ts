"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import slugify from "slugify";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { getDescription } from "@/utils/getDescription";
import { PostFormProps, postSchema } from "@/schemas/postSchema";

export async function editPost({
  values,
  postId,
}: {
  values: PostFormProps;
  postId: string;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof postId !== "string") {
    return { error: "Invalid postId" };
  }

  const parsedBody = postSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { title, article } = data;

  const postResponse = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (postResponse?.title.toLowerCase() !== title.toLowerCase()) {
    const postTitleExists = await prisma.post.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    if (postTitleExists) {
      return { error: "Post title exists" };
    }
  }

  const slug = slugify(title, { lower: true });

  const shortDescription = getDescription(article, 250, 250);

  try {
    const response = await prisma.post.update({
      where: {
        id_userId: {
          id: postId,
          userId: session.user.id,
        },
      },
      data: { ...data, slug, shortDescription },
    });

    revalidatePath("/", "layout");

    if (response.editorsChoice) {
      revalidateTag("editorsChoice");
    }

    return { success: "Post updated successfully", data: response };
  } catch (error) {
    // console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
