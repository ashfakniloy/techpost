import { BASE_URL } from "@/config";

export async function fetchCounts({ postId }: { postId: string }) {
  const url = `${BASE_URL}/api/post/count?postId=${postId}`;

  const response = await fetch(url, {
    next: { tags: ["counts"] },
  });

  const data = await response.json();
  return data;
}
