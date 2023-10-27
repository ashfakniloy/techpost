import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { getCommentReplies } from "@/db/queries/getCommentReplies";
import { commentReplySchema } from "@/schemas/commentSchema";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const body = await request.json();
  // console.log("request body", body);

  const { commentReply, postId, commentId } = await request.json();

  if (!commentReply || !postId || !commentId) {
    return NextResponse.json(
      { error: "All parameters required" },
      { status: 400 }
    );
  }

  const parsedCommentReply = commentReplySchema.safeParse({ commentReply });

  if (!parsedCommentReply.success) {
    const { errors } = parsedCommentReply.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedCommentReply;
  const { commentReply: commentReplyParsed } = data;

  try {
    const response = await prisma.commentReply.create({
      data: {
        commentReply: commentReplyParsed,

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
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Comment Replied Successfully",
        response,
      },
      { status: 200 }
    );
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

  const commentReplyId = searchParams.get("commentReplyId");

  if (typeof commentReplyId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.commentReply.delete({
      where: {
        id: commentReplyId,
      },
    });

    return NextResponse.json({
      message: "Comment Reply Deleted Successfully",
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

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const commentId = searchParams.get("commentId");
  // const take = searchParams.get("take");
  // const skip = searchParams.get("skip");

  if (
    typeof commentId !== "string"
    // ||
    // typeof take !== "string" ||
    // typeof skip !== "string"
  ) {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const { count: commentRepliesCount, data: commentReplies } =
      await getCommentReplies({ commentId });

    return NextResponse.json({ commentRepliesCount, commentReplies });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
