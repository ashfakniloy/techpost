import { getAuthSession } from "@/lib/next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";

export async function DELETE(request: NextRequest) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Need to pass post ids" },
      { status: 400 }
    );
  }

  const { deleteId } = body;

  // console.log("deleteId", deleteId);

  // return NextResponse.json({ deleteId: deleteId }, { status: 200 });

  // const { searchParams } = request.nextUrl;

  // const postId = searchParams.get("postId");

  // if (typeof postId !== "string") {
  //   return NextResponse.json(
  //     { error: "Invalid Searchparams" },
  //     { status: 400 }
  //   );
  // }

  // const responsePostsImages = await prisma.post.findMany({
  //     where: {
  //       imageId: {
  //         in: deleteId
  //       }
  //     },
  //     select: {
  //       imageId: true,
  //     },
  //   });

  if (typeof deleteId === "string") {
    // const responseImageIds = await prisma.post.findMany({
    //   where: {
    //     id: deleteId,
    //   },
    //   select: {
    //     imageId: true,
    //   },
    // });

    const responseImageIds = await prisma.post.findMany({
      where: {
        id: {
          in: [deleteId],
        },
      },
      select: {
        imageId: true,
      },
    });

    const imageIds = responseImageIds.map((response) => response.imageId);

    // return NextResponse.json({ success: imageIds }, { status: 200 });

    try {
      const response = await prisma.post.delete({
        where: {
          id: deleteId,
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.uploader.destroy(
          imageIds.length > 1
            ? await cloudinary.v2.api.delete_resources(imageIds)
            : await cloudinary.v2.uploader.destroy(imageIds[0])
        );
      }

      revalidateTag("editorsChoice");

      return NextResponse.json({ message: "Deleted Successfully", response });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }

  if (Array.isArray(deleteId)) {
    const responseImageIds = await prisma.post.findMany({
      where: {
        id: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const imageIds = responseImageIds.map((response) => response.imageId);

    // return NextResponse.json({ success: imageIds }, { status: 200 });

    try {
      const response = await prisma.post.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse =
          imageIds.length > 1
            ? await cloudinary.v2.api.delete_resources(imageIds)
            : await cloudinary.v2.uploader.destroy(imageIds[0]);
      }

      revalidateTag("editorsChoice");

      return NextResponse.json({ message: "Deleted Successfully", response });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }
}
