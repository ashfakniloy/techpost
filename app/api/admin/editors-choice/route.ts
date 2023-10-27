import { getAuthSession } from "@/lib/next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
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

  try {
    const postResponse = await prisma.post.findFirst({
      where: {
        editorsChoice: true,
      },
    });

    if (postResponse?.id === postId) {
      return NextResponse.json(
        { error: "Already marked as editor's choice" },
        { status: 400 }
      );
    }

    if (postResponse?.id) {
      const removeEditorsChoice = await prisma.post.update({
        where: {
          id: postResponse?.id,
        },
        data: {
          editorsChoice: false,
          updatedAt: postResponse?.updatedAt,
        },
      });
    }

    const addEditorsChoiceResponse = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        editorsChoice: true,
        updatedAt: postResponse?.updatedAt,
      },
    });

    revalidateTag("editorsChoice");

    return NextResponse.json({
      message: "Post marked as editor's choice",
      addEditorsChoiceResponse,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
