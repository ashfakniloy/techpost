import { BASE_URL } from "@/config";

export async function fetchEditorsChoice() {
  const url = `${BASE_URL}/api/post/editorsChoice`;

  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: ["editorsChoice"] },
  });

  const post = await response.json();

  return post;
}
