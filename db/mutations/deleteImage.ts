"use server";

import { getAuthSession } from "@/lib/next-auth";
import cloudinary from "@/lib/cloudinary";

export async function deleteImage({ imageId }: { imageId: string }) {
  const session = await getAuthSession();

  const canDeleteImage =
    session?.user.role === "USER" || session?.user.role === "ADMIN";

  if (!canDeleteImage) {
    return { error: "Unauthorized" };
  }

  if (typeof imageId !== "string") {
    return { error: "Invalid imageId" };
  }

  try {
    const response = await cloudinary.v2.uploader.destroy(imageId);

    if (response.result === "ok") {
      return { success: "Image deleted", data: response };
    } else {
      return { error: "Image delete error", data: response };
    }
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
