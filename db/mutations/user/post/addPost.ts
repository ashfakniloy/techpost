"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { getDescription } from "@/utils/getDescription";
import { PostFormProps, postSchema } from "@/schemas/postSchema";

export async function addPost({ values }: { values: PostFormProps }) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const parsedBody = postSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { title, article } = data;

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

  const slug = slugify(title, { lower: true });

  const shortDescription = getDescription(article, 250, 250);

  try {
    const response = await prisma.post.create({
      data: {
        ...data,
        userId: session.user.id,
        slug,
        shortDescription,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: "Post created successfully",
      data: response,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
