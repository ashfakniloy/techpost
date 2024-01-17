"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { emailSchema, EmailFormProps } from "@/schemas/accountSchema";

export async function changeEmail({ values }: { values: EmailFormProps }) {
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

  const parsedBody = emailSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { email, password } = data;

  const passwordMatched = await bcrypt.compare(
    password,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password" };
  }

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: { email: email },
    });

    revalidatePath("/my-profile/account-setting", "page");
    revalidatePath("/admin", "layout");

    return {
      success: "Email changed successfully",
    };
  } catch (error) {
    console.log("error", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Email already exists" };
      }
    }
    return { error: "Something went wrong", data: error };
  }
}
