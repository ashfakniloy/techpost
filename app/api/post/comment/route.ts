import { NextRequest, NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { commentSchema } from "@/schemas/commentSchema";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const postId = searchParams.get("postId");
  const page = searchParams.get("page");

  if (!postId) {
    return NextResponse.json({ error: "PostID required" }, { status: 400 });
  }

  // if (typeof page !== "string" || typeof limit !== "string") {
  //   return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  // }

  try {
    const count = await prisma.comment.count({
      where: {
        postId: postId,
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      take: Number(page),
      skip: 0,
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

        commentsReplies: {
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
        },

        commentsLikes: {
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
        },
      },
    });

    return NextResponse.json({ comments, count });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const body = await request.json();
  // console.log("request body", body);

  const { comment, postId } = await request.json();

  if (!comment || !postId) {
    return NextResponse.json(
      { error: "All parameters required" },
      { status: 400 }
    );
  }

  const parsedComment = commentSchema.safeParse({ comment });

  if (!parsedComment.success) {
    const { errors } = parsedComment.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedComment;
  const { comment: commentParsed } = data;

  try {
    const response = await prisma.comment.create({
      data: {
        comment: commentParsed,
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
    });

    // revalidatePath("/post/[postId]");

    return NextResponse.json({ message: "Commented Successfully", response });
  } catch (error) {
    console.log(error);
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

  const { searchParams } = request.nextUrl;

  const commentId = searchParams.get("commentId");

  if (typeof commentId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json({ message: "Deleted Successfully", response });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
