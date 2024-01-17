"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { passwordSchema, PasswordFormProps } from "@/schemas/accountSchema";

export async function changePassword({
  values,
}: {
  values: PasswordFormProps;
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

  const parsedBody = passwordSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { currentPassword, newPassword } = data;

  const passwordMatched = await bcrypt.compare(
    currentPassword,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password" };
  }

  const saltValue = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, saltValue);

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: { password: hashedNewPassword },
    });

    // revalidatePath("/my-profile/account-setting", "page");
    // revalidatePath("/admin", "layout");

    return {
      success: "Password Changed successfully",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
