import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.like.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        post: {
          select: {
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({ message: "Liked Successfully", response });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.like.delete({
      where: {
        postId_userId: {
          userId: session.user.id,
          postId: postId,
        },
      },
      select: {
        post: {
          select: {
            likes: true,
          },
        },
      },
    });

    // console.log("rspns", response);

    // const filteredRes = response.post.likes.filter(
    //   (like) => like.userId !== session.user.id
    // );

    return NextResponse.json({
      message: "Unliked Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
