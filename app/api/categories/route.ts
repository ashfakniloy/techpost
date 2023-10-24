import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        name: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong" });
  }

  // return { data };
}
