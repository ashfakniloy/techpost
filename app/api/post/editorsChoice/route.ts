import { NextResponse } from "next/server";

import { getEditorsChoicePost } from "@/db/queries/getEditorsChoicePost";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data } = await getEditorsChoicePost();

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong" });
  }
}
