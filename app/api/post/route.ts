import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

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

  const { title } = body;

  const postTitleExists = await prisma.post.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
    },
  });

  if (postTitleExists) {
    return NextResponse.json({ error: "Post title exists" }, { status: 400 });
  }

  try {
    const response = await prisma.post.create({
      data: {
        ...body,
        userId: session.user.id,
      },
      // data: {
      //   ...body,
      //   userId: session.user.id,
      // },
    });

    revalidatePath("/");
    // revalidatePath("/my-profile");
    // revalidatePath("/category/[categoryName]");
    // revalidatePath("/user/[username]");
    // revalidatePath("/post/[postId]");
    // revalidatePath("/");
    // revalidatePath("/admin");

    return NextResponse.json({
      message: "Post created successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

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

  const { title } = body;

  const postTitleExists = await prisma.post.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive",
      },
    },
  });

  if (postTitleExists) {
    return NextResponse.json({ error: "Post title exists" }, { status: 400 });
  }

  try {
    const response = await prisma.post.update({
      where: {
        id_userId: {
          id: postId,
          userId: session.user.id,
        },
      },
      data: body,
    });

    // revalidatePath("/");
    // revalidatePath("/my-profile");
    // revalidatePath("/category/[categoryName]");
    // revalidatePath("/user/[username]");
    // revalidatePath("/post/[postId]");

    return NextResponse.json({
      message: "Post created successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";

  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("postId");
  const imageId = searchParams.get("imageId");

  // return NextResponse.json({ success: session }, { status: 200 });

  if (typeof postId !== "string" || typeof imageId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  try {
    const response = isAdmin
      ? await prisma.post.delete({
          where: {
            id: postId,
          },
        })
      : await prisma.post.delete({
          where: {
            id_userId: {
              id: postId,
              userId: session.user.id,
            },
          },
        });

    if (response) {
      const imageDeleteResponse = await cloudinary.v2.uploader.destroy(imageId);
    }

    // revalidatePath("/");
    // revalidatePath("/my-profile");
    // revalidatePath("/category/[categoryName]");
    // revalidatePath("/user/[username]");
    // revalidatePath("/post/[postId]");

    return NextResponse.json({ message: "Deleted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
