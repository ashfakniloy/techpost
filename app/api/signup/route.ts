import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Content cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { username, email, password } = body;

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
        ...body,
        password: hashedPassword,
      },
    });

    //without hased password
    // const response = await prisma.user.create({
    //   data: body,
    // });

    // console.log("response", response);
    if (response.id) {
      const response2 = await prisma.profile.create({
        data: { userId: response.id },
      });

      return NextResponse.json(
        { message: "account and profile created", response, response2 },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
