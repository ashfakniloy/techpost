import AddPostForm from "./AddPostForm";
import { fetchCategories } from "@/db/fetch/fetchCategories";
// import { getCategories } from "@/db/queries/getCategories";

export const metadata = {
  title: "Add new post",
};

async function AddPostPage() {
  // const { data: categories } = await getCategories();
  // console.log("categories", categories);

  const categories: CategoryProps[] = await fetchCategories();

  const allcategories = categories.map((category) => category.name);

  return (
    <div>
      <AddPostForm categories={allcategories} />
    </div>
  );
}

export default AddPostPage;
