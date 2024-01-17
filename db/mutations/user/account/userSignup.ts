"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { signupSchema, SignupFormProps } from "@/schemas/signupSchema";

export async function userSignup({ values }: { values: SignupFormProps }) {
  const parsedBody = signupSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { username, email, password } = data;

  const emailExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const usernameExists = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (emailExists) {
    return {
      error: "Email already exists",
    };
  }

  if (usernameExists) {
    return {
      error: "Username already exists",
    };
  }

  const saltValue = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltValue);

  try {
    const response = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (response.id) {
      const response2 = await prisma.profile.create({
        data: { userId: response.id },
      });

      return {
        success: "Account Created Successfully",
      };
    }
  } catch (error) {
    console.log("errorData", error);

    return {
      error: "Something went wrong",
      data: error,
    };
  }
}
