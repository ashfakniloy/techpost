import { getCategories } from "@/prisma/find/getCategories";
import AddPostForm from "./AddPostForm";

async function AddPostPage() {
  const { data: categories } = await getCategories();
  // console.log("categories", categories);

  const allcategories = categories.map((category) => category.name);

  return (
    <div>
      <AddPostForm categories={allcategories} />
    </div>
  );
}

export default AddPostPage;
