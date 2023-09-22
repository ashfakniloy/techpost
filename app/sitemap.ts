import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { BASE_URL } from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });
  const users = await prisma.user.findMany({
    select: {
      username: true,
      updatedAt: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      updatedAt: true,
    },
  });

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/post/${encodeURIComponent(post.slug)}`,
    lastModified: post.updatedAt.toISOString(),
  }));

  const userUrls = users.map((user) => ({
    url: `${BASE_URL}/user/${encodeURIComponent(user.username)}`,
    lastModified: user.updatedAt.toISOString(),
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/post/${encodeURIComponent(category.name)}`,
    lastModified: category.updatedAt.toISOString(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
    },
    ...postUrls,
    ...userUrls,
    ...categoryUrls,
  ];
}
