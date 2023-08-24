import { getCategories } from "@/db/queries/getCategories";
import AddPostForm from "./AddPostForm";

export const metadata = {
  title: "Add new post",
};

async function AddPostPage() {
  const { data: categories } = await getCategories();
  // console.log("categories", categories);

  const allcategories: any = categories.map((category) => category.name);

  return (
    <div>
      <AddPostForm categories={allcategories} />
    </div>
  );
}

export default AddPostPage;
