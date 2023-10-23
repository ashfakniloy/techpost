"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTagAction(tag: string) {
  revalidateTag(tag);
}
