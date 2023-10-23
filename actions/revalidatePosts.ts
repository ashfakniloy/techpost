"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePosts() {
  revalidatePath("/(user)/(content)", "page");
  revalidatePath("/(user)/(content)/my-profile/posts", "page");
  revalidatePath("/(user)/(content)/my-profile/posts", "page");
  revalidatePath("/(admin)/admin/dashboard", "layout");

  // revalidatePath("/", "page");
  // revalidatePath("/my-profile/posts", "page");
  // revalidatePath("/category/[categoryName]", "page");
  // revalidatePath("/admin/dashboard", "layout");
}
