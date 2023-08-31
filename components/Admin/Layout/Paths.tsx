"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

function Paths() {
  const pathname = usePathname();
  // const params = useParams();

  // console.log("params", params);
  const paths = pathname?.split("/");
  const pathsFiltered = paths?.filter((path) => path !== "");

  const pathsWithLinks = pathsFiltered?.reduce<
    { name: string; link: string }[]
  >((acc, value, index) => {
    const link = `/${pathsFiltered.slice(0, index + 1).join("/")}`;

    acc.push({
      name: value === "admin" ? "homepage" : value,
      link: link,
    });

    return acc;
  }, []);

  return (
    <div className="lg:ml-1 mt-2 text-gray-600 dark:text-gray-300 text-xs lg:text-sm flex flex-wrap">
      {pathsWithLinks?.map((path, i) => (
        <div key={i} className="flex items-center">
          <Link href={path.link}>
            <span className="hover:underline capitalize">
              {decodeURIComponent(path.name)}
            </span>
          </Link>
          {i < pathsWithLinks.length - 1 && (
            <span className="mx-1 lg:mx-2">
              <ChevronDoubleRightIcon className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Paths;
