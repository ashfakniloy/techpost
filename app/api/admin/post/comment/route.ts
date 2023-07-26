import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Need to pass comment ids" },
      { status: 400 }
    );
  }

  const { deleteId } = body;

  if (typeof deleteId === "string") {
    try {
      const response = await prisma.comment.delete({
        where: {
          id: deleteId,
        },
      });

      return NextResponse.json({
        message: "Comment deleted successfully",
        response,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await prisma.comment.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      return NextResponse.json({
        message: `${deleteId.length} comment deleted successfully`,
        response,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
