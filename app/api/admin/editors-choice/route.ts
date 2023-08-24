import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

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

  // const body = await request.json();

  // if (!body) {
  //   return NextResponse.json(
  //     { error: "Content can not be empty" },
  //     { status: 400 }
  //   );
  // }

  // if (Object.keys(body).length === 0) {
  //   return NextResponse.json(
  //     { error: "Object cannot be empty" },
  //     { status: 400 }
  //   );
  // }

  // if (Object.values(body).includes("")) {
  //   return NextResponse.json(
  //     { error: "All fields are required" },
  //     { status: 400 }
  //   );
  // }

  // // return NextResponse.json({
  // //   success: "Category created successfully",
  // //   body,
  // // });

  // const { name, imageUrl, imageId, quotes } = body;

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

    return NextResponse.json({
      message: "Post marked as editor's choice",
      addEditorsChoiceResponse,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
