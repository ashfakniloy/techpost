import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title");

  if (typeof title !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const response = await prisma.post.findMany({
      where: {
        title: {
          startsWith: title,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        _count: {
          select: {
            comments: true,
            views: true,
          },
        },
      },
      // select: {
      //   id: true,
      //   title: true,
      // },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong" });
  }
}
