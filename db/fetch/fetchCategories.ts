import { BASE_URL } from "@/config";

export async function fetchCategories() {
  const url = `${BASE_URL}/api/categories`;

  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: ["categories"] },
  });
  const categories = await response.json();

  return categories;
}
