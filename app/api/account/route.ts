import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { Prisma } from "@prisma/client";
import {
  deleteAccountSchema,
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/schemas/accountSchema";

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const body = await request.json();

  // if (!body) {
  //   return NextResponse.json(
  //     { error: "Content can not be empty" },
  //     { status: 400 }
  //   );
  // }

  // if (Object.keys(body).length === 0) {
  //   return NextResponse.json(
  //     { error: "Content cannot be empty" },
  //     { status: 400 }
  //   );
  // }

  // if (Object.values(body).includes("")) {
  //   return NextResponse.json(
  //     { error: "All fields are required" },
  //     { status: 400 }
  //   );
  // }

  const { searchParams } = request.nextUrl;
  const changeType = searchParams.get("changeType");

  if (typeof changeType !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  const accountResponse = await prisma.user.findUnique({
    where: {
      // email: session.user.email,
      id: session.user.id,
    },
  });

  if (!accountResponse) {
    return NextResponse.json({ error: "Account not found" }, { status: 400 });
  }

  const body = await request.json();

  if (changeType === "username") {
    const parsedBody = usernameSchema.safeParse(body);

    if (!parsedBody.success) {
      const { errors } = parsedBody.error;

      return NextResponse.json(
        { error: "Invalid request", data: errors },
        { status: 400 }
      );
    }

    const { data } = parsedBody;
    const { username, password } = data;

    const passwordMatched = await bcrypt.compare(
      password,
      accountResponse.password
    );

    if (!passwordMatched) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    // const usernameExists = await prisma.user.findUnique({
    //   where: {
    //     username: username,
    //   },
    // });

    // if (usernameExists) {
    //   return NextResponse.json(
    //     { error: "Username already exists" },
    //     { status: 400 }
    //   );
    // }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: { username: username },
      });

      return NextResponse.json({
        message: "Username Changed successfully",
      });
    } catch (error) {
      console.log("error", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return NextResponse.json(
            { error: "Username already exists" },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }

  if (changeType === "email") {
    const parsedBody = emailSchema.safeParse(body);

    if (!parsedBody.success) {
      const { errors } = parsedBody.error;

      return NextResponse.json(
        { error: "Invalid request", data: errors },
        { status: 400 }
      );
    }

    const { data } = parsedBody;
    const { email, password } = data;

    const passwordMatched = await bcrypt.compare(
      password,
      accountResponse.password
    );

    if (!passwordMatched) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    // const emailExists = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (emailExists) {
    //   return NextResponse.json(
    //     { error: "Email already exists" },
    //     { status: 400 }
    //   );
    // }

    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: { email: email },
      });

      return NextResponse.json({
        message: "Email Changed successfully",
      });
    } catch (error) {
      console.log("error", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 }
          );
        }
      }
      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }

  if (changeType === "password") {
    const parsedBody = passwordSchema.safeParse(body);

    if (!parsedBody.success) {
      const { errors } = parsedBody.error;

      return NextResponse.json(
        { error: "Invalid request", data: errors },
        { status: 400 }
      );
    }

    const { data } = parsedBody;
    const { currentPassword, newPassword } = data;

    const passwordMatched = await bcrypt.compare(
      currentPassword,
      accountResponse.password
    );

    if (!passwordMatched) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
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

      return NextResponse.json({
        message: "Password Changed successfully",
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userCheckResponse = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userCheckResponse) {
    return NextResponse.json(
      { error: "Unauthorized, User not found" },
      { status: 404 }
    );
  }

  const body = await request.json();

  const parsedBody = deleteAccountSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedBody;
  const { password } = data;

  const passwordMatched = await bcrypt.compare(
    password,
    userCheckResponse.password
  );

  if (!passwordMatched) {
    return NextResponse.json(
      { error: "Unauthorized, Incorrect passowrd" },
      { status: 400 }
    );
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

        NextResponse.json({ success: profileImageDelete }, { status: 200 });
      } catch (error) {
        NextResponse.json(
          {
            error: "Something went wrong when deleting profile image",
            data: error,
          },
          { status: 400 }
        );
      }
    }

    if (postsImages?.length) {
      try {
        const postsImagesDelete = await cloudinary.v2.api.delete_resources(
          postsImages
        );

        NextResponse.json({ success: postsImagesDelete }, { status: 200 });
      } catch (error) {
        NextResponse.json(
          {
            error: "Something went wrong when deleteing posts image",
            data: error,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ success: "account deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
