import { getSinglePost } from "@/prisma/find/getSinglePost";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { getCategories } from "@/prisma/find/getCategories";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata = {
  title: "Edit post",
};

async function EditPostPage({ params: { slug } }: Props) {
  const { data: post } = await getSinglePost({ slug });
  const { data: categories } = await getCategories();

  const allcategories = categories.map((category) => category.name);

  // const postCopy = { ...post };

  // delete postCopy.createdAt;
  // delete postCopy.updatedAt;
  // delete postCopy._count;

  // console.log("postcopy", postCopy);

  if (!post) {
    notFound();
  }

  const postCopy = {
    id: post.id,
    title: post.title,
    categoryName: post.categoryName,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
    article: post.article,
  };

  // console.log("postCopy", postCopy);

  return <EditPostForm post={postCopy} categories={allcategories} />;
}

export default EditPostPage;
