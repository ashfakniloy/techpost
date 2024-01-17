"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import {
  deleteAccountSchema,
  DeleteAccountFormProps,
} from "@/schemas/accountSchema";

export async function deleteAccount({
  values,
}: {
  values: DeleteAccountFormProps;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const accountResponse = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!accountResponse) {
    return { error: "Account not found" };
  }

  const parsedBody = deleteAccountSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { password } = data;

  const passwordMatched = await bcrypt.compare(
    password,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password" };
  }

  const responseProfileImage = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      imageId: true,
    },
  });

  const responsePostsImages = await prisma.post.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      imageId: true,
    },
  });

  const postsImages = responsePostsImages.flatMap((image) => image.imageId);

  try {
    const response = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    if (responseProfileImage?.imageId) {
      try {
        const profileImageDelete = await cloudinary.v2.uploader.destroy(
          responseProfileImage?.imageId
        );

        console.log("profileImageDelete", profileImageDelete);
      } catch (error) {
        console.log("Profile image delete error", error);
      }
    }

    if (postsImages?.length) {
      try {
        const postsImagesDelete = await cloudinary.v2.api.delete_resources(
          postsImages
        );

        console.log("postsImagesDelete", postsImagesDelete);
      } catch (error) {
        console.log("Posts image delete error", error);
      }
    }

    revalidatePath("/", "layout");

    return { success: "Account deleted" };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
