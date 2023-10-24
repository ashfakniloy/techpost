import { BASE_URL } from "@/config";

export async function fetchSingleCategory({
  categoryName,
}: {
  categoryName: string;
}) {
  const categoryNameEncoded = encodeURIComponent(categoryName);
  const url = `${BASE_URL}/api/category?categoryName=${categoryNameEncoded}`;

  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: [`category-${categoryName.toLowerCase()}`] },
  });

  const category = await response.json();

  return category;
}
