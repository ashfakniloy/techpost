import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getDescription } from "@/utils/getDescription";
import { postSchema } from "@/schemas/postSchema";
// import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsedBody = postSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

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

  const { data } = parsedBody;
  const { title, article } = data;

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

  const slug = slugify(title, { lower: true });

  const shortDescription = getDescription(article, 200, 200);

  try {
    const response = await prisma.post.create({
      data: {
        ...data,
        userId: session.user.id,
        slug,
        shortDescription,
      },
      // data: {
      //   ...body,
      //   userId: session.user.id,
      // },
    });

    // revalidatePath("/");
    // revalidatePath("/my-profile");
    // revalidatePath("/category/[categoryName]");
    // revalidatePath("/user/[username]");
    // revalidatePath("/post/[postId]");
    // revalidatePath("/");
    // revalidatePath("/admin");

    return NextResponse.json({
      success: "Post created successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

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

  const parsedBody = postSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedBody;
  const { title, article } = data;

  const postResponse = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (postResponse?.title.toLowerCase() !== title.toLowerCase()) {
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
  }

  const slug = slugify(title, { lower: true });

  const shortDescription = getDescription(article, 200, 200);

  try {
    const response = await prisma.post.update({
      where: {
        id_userId: {
          id: postId,
          userId: session.user.id,
        },
      },
      data: { ...data, slug, shortDescription },
    });

    // revalidatePath("/");
    // revalidatePath("/my-profile");
    // revalidatePath("/category/[categoryName]");
    // revalidatePath("/user/[username]");
    // revalidatePath("/post/[postId]");

    return NextResponse.json({
      success: "Post updated successfully",
      response,
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAuthSession();

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

    return NextResponse.json({ success: "Deleted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
