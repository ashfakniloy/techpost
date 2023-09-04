import Link from "next/link";
import { getCategories } from "@/db/queries/getCategories";

async function Categories() {
  const { data: categories } = await getCategories();

  return (
    <section className="w-[360px] bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md">
      <h4 className="p-3 font-bold text-center text-gray-900 border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        Categories
      </h4>
      <div className="py-2">
        {categories.map((category) => (
          <div
            key={category.name}
            className="py-1.5 px-6 flex justify-between items-center"
          >
            <p className="text-gray-900 capitalize dark:text-gray-50 link">
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                // href={`/category/${category.name
                //   .split(" ")
                //   .join("_")
                //   .toLowerCase()}`}
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
    </section>
  );
}

export default Categories;
