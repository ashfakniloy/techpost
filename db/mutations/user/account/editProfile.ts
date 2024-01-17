"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { profileSchema, ProfileFormProps } from "@/schemas/profileSchema";

export async function editProfile({
  values,
  profileId,
}: {
  values: ProfileFormProps;
  profileId: string;
}) {
  const session = await getAuthSession();

  if (!session) {
    return { error: "Unauthorized" };
  }

  if (typeof profileId !== "string") {
    return { error: "Invalid profile Id" };
  }

  const parsedBody = profileSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;

  try {
    const response = await prisma.profile.update({
      where: {
        id_userId: {
          id: profileId,
          userId: session.user.id,
        },
      },
      data: data,
    });

    // revalidatePath("/", "layout");
    revalidatePath("/my-profile", "layout");
    revalidatePath("/user", "layout");
    revalidatePath("/admin", "layout");

    return { success: "Profile updated", data: response };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
