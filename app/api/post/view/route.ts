import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

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

  // if (isViewed) {
  //   return NextResponse.json({ error: "Post already viewed" }, { status: 400 });
  // }

  try {
    const respone =
      !isViewed &&
      (await prisma.view.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          deviceId: deviceId,
        },
      }));

    return NextResponse.json({ message: "Post Viewed successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
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
