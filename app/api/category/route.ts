import { NextRequest, NextResponse } from "next/server";
import { getCategoryByName } from "@/db/queries/getCategoryByName";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const categoryName = searchParams.get("categoryName");

  if (typeof categoryName !== "string") {
    return NextResponse.json({ error: "Invalid Searchparam" }, { status: 400 });
  }

  try {
    const { data } = await getCategoryByName({
      categoryName: categoryName,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong" });
  }
}
