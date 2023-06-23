import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { categoryName, secret_id } = await request.json();

  if (!categoryName || !secret_id) {
    return NextResponse.json(
      { error: "All parameters required" },
      { status: 400 }
    );
  }

  if (secret_id !== "my-secret-id") {
    return NextResponse.json({ error: "Secret id invalid" }, { status: 400 });
  }

  try {
    const response = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    return NextResponse.json({ message: "Category Created", response });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
