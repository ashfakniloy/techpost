import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/schemas/signupSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsedBody = signupSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
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
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  if (usernameExists) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
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

      return NextResponse.json(
        { message: "account and profile created" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
