import cloudinary from "@/lib/cloudinary";
import { getAuthSession } from "@/lib/next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const imageId = searchParams.get("imageId");

  const session = await getAuthSession();

  const canDeleteImage =
    session?.user.role === "USER" || session?.user.role === "ADMIN";

  if (!canDeleteImage) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (typeof imageId !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  // return NextResponse.json({ success: imageId }, { status: 200 });

  try {
    const response = await cloudinary.v2.uploader.destroy(imageId);
    // const res = await cloudinary.uploader.destroy(
    //   imageId,
    //   function (error, result) {
    //     console.log(result, error);
    //   }
    // );
    // const res = await cloudinary.uploader.destroy(
    //   "nextjs13-fullstack-blog/n1utbmtwl0rw2ibstvx7"
    // );

    if (response.result === "ok") {
      return NextResponse.json({ response }, { status: 200 });
    } else {
      return NextResponse.json({ response }, { status: 400 });
    }

    // return NextResponse.json({ result }, { status: 200 });

    // if (result === "ok") {
    //   return NextResponse.json({ result }, { status: 200 });
    // } else {
    //   return NextResponse.json({ result }, { status: 400 });
    // }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
