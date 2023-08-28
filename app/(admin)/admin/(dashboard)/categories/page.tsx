import Link from "next/link";
import AddCategory from "./AddCategory";
import { getCategories } from "@/db/queries/getCategories";

async function AdminCategoriesPage() {
  const { data: categories } = await getCategories();
  // console.log("categories", categories);

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0">
        <AddCategory />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
        {categories.map((category, i) => (
          <Link
            key={i}
            href={`/admin/categories/${category.name.toLowerCase()}`}
          >
            <div
              key={i}
              className="h-[170px] relative w-full p-8 bg-gray-50 dark:bg-custom-gray6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <div className="flex justify-between items-center h-full font-montserrat select-none">
                <h1 className="text-3xl tracking-wider font-semibold capitalize">
                  {category.name}
                </h1>
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total posts
                  </p>
                  <h3 className="text-2xl font-bold">
                    {category._count.posts}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminCategoriesPage;
