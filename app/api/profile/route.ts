import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/schemas/profileSchema";

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const profileId = searchParams.get("profileId");

  if (typeof profileId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const parsedBody = profileSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedBody;

  try {
    const response = await prisma.profile.update({
      where: {
        id_userId: {
          id: profileId,
          userId: session.user.id,
        },
      },
      data: data,
    });

    return NextResponse.json({
      message: "Profile updated successfully",
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
