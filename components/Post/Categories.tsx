// import { categories } from "@/data/categories";
import { getCategories } from "@/prisma/find/getCategories";
import Link from "next/link";

async function Categories() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { data: categories } = await getCategories();

  return (
    <div className="w-[360px] bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md">
      <p className="p-3 font-semibold text-center text-gray-900 border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        Categories
      </p>
      <div className="py-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className="py-1.5 px-6 flex justify-between items-center"
          >
            <p className="text-gray-900 capitalize dark:text-gray-50 link">
              <Link
                href={`/category/${category.name
                  .split(" ")
                  .join("_")
                  .toLowerCase()}`}
              >
                {category.name}
              </Link>
            </p>
            <span className="px-2.5 py-1 bg-zinc-300 dark:bg-zinc-500 rounded-xl text-xs">
              {category._count.posts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
