import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const postId = searchParams.get("postId");

  if (typeof postId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const viewsCount = await prisma.view.count({
      where: { postId: postId },
    });

    const likesCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    });

    const commentsCount = await prisma.comment.count({
      where: {
        postId: postId,
      },
    });

    const likesData = await prisma.like.findMany({
      where: {
        postId: postId,
      },

      include: {
        user: {
          select: {
            username: true,
            id: true,
            profile: {
              select: {
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      viewsCount,
      likesCount,
      likesData,
      commentsCount,
    });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong" });
  }
}
