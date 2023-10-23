import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { getSinglePost } from "@/db/queries/getSinglePost";
// import { getCategories } from "@/db/queries/getCategories";
import { fetchCategories } from "@/db/fetch/fetchCategories";

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

  if (!post) {
    notFound();
  }

  // const { data: categories } = await getCategories();

  const categories: CategoryProps[] = await fetchCategories();

  const allcategories = categories.map((category) => category.name);

  const postFiltered = {
    id: post.id,
    title: post.title,
    categoryName: post.categoryName,
    imageUrl: post.imageUrl,
    imageId: post.imageId,
    article: post.article,
  };

  return <EditPostForm post={postFiltered} categories={allcategories} />;
}

export default EditPostPage;
