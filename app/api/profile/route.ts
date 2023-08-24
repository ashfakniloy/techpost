import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { searchParams } = request.nextUrl;
  const profileId = searchParams.get("profileId");

  if (typeof profileId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

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

  try {
    const response = await prisma.profile.update({
      where: {
        id_userId: {
          id: profileId,
          userId: session.user.id,
        },
      },
      data: body,
    });

    return NextResponse.json({
      message: "Profile created successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
