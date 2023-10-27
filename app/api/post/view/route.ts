import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  if (session?.user.role === "ADMIN") return;

  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("postId");
  const deviceId = searchParams.get("deviceId");

  if (typeof postId !== "string" || typeof deviceId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 400 });
  }

  const isViewed = await prisma.view.findUnique({
    where: {
      postId_deviceId: {
        postId: postId,
        deviceId: deviceId,
      },
    },
  });

  if (isViewed) {
    return NextResponse.json({});
  }

  try {
    await prisma.view.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        deviceId: deviceId,
      },
    });

    // revalidatePath("/", "page");
    // revalidatePath("/my-profile", "page");
    // revalidatePath("/category/[categoryName]", "page");
    // revalidatePath("/user/[username]", "page");
    // revalidatePath("/post/[postId]", "page");

    // revalidatePath("/admin");

    return NextResponse.json(
      { message: "Post view added", viewAdded: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 400 }
    );
  }

  // try {
  //   const response = await prisma.post.update({
  //     where: {
  //       id: postId,
  //     },
  //     data: {
  //       views: { increment: 1 },
  //     },
  //   });

  // return NextResponse.json({
  //   message: "Post Viewed successfully",
  // });
  // } catch (error) {
  // console.log(error);
  // return NextResponse.json({ error }, { status: 400 });
  // }
}
