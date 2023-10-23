import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/next-auth";
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
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Object cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { deleteId } = body;

  // return NextResponse.json({ success: deleteId }, { status: 200 });

  // const userCheckResponse = await prisma.user.findUnique({
  //   where: {
  //     id: session.user.id,
  //   },
  // });

  // if (!userCheckResponse) {
  //   return NextResponse.json(
  //     { error: "Unauthorized, User not found" },
  //     { status: 404 }
  //   );
  // }

  // if (userCheckResponse.password !== password) {
  //   return NextResponse.json(
  //     { error: "Unauthorized, Passwords don't match" },
  //     { status: 400 }
  //   );
  // }

  if (typeof deleteId === "string") {
    const responseProfileImageId = await prisma.profile.findUnique({
      where: {
        userId: deleteId,
      },
      select: {
        imageId: true,
      },
    });

    const responsePostsImagesId = await prisma.post.findMany({
      where: {
        userId: deleteId,
      },
      select: {
        imageId: true,
      },
    });

    const profileImageId = responseProfileImageId?.imageId;

    const postsImagesIds = responsePostsImagesId.map(
      (response) => response.imageId
    );

    const imageIds = [...postsImagesIds, profileImageId].filter(
      (imageId): imageId is string => imageId !== null
    );

    // return NextResponse.json({ success: imageIds }, { status: 200 });

    try {
      const response = await prisma.user.delete({
        where: {
          id: deleteId,
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
          imageIds
        );
      }

      revalidateTag("editorsChoice");

      return NextResponse.json(
        { success: "account deleted", response },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "account delete failed" },
        { status: 400 }
      );
    }
  }

  if (Array.isArray(deleteId)) {
    const responseProfileImageIds = await prisma.profile.findMany({
      where: {
        userId: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const responsePostsImagesIds = await prisma.post.findMany({
      where: {
        userId: {
          in: deleteId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const profileImageIds = responseProfileImageIds
      .map((response) => response.imageId)
      .filter((imageId): imageId is string => imageId !== null);

    const postsImagesIds = responsePostsImagesIds.map(
      (response) => response.imageId
    );

    // const imageIds = postsImagesIds.concat(profileImageIds);
    const imageIds = [...postsImagesIds, ...profileImageIds];

    // return NextResponse.json({ success: imageIds }, { status: 200 });

    try {
      const response = await prisma.user.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
          imageIds
        );
      }

      revalidateTag("editorsChoice");

      return NextResponse.json(
        { success: "account deleted", response },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "account delete failed" },
        { status: 400 }
      );
    }
  }
}
