"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { UsernameFormProps, usernameSchema } from "@/schemas/accountSchema";

export async function changeUsername({
  values,
}: {
  values: UsernameFormProps;
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

  const parsedBody = usernameSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { username, password } = data;

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
      data: { username: username },
    });

    revalidatePath("/", "layout");

    return {
      success: "Username changed successfully",
    };
  } catch (error) {
    console.log("error", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Username already exists" };
      }
    }

    return { error: "Something went wrong", data: error };
  }
}
