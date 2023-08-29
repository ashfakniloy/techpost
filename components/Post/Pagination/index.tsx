// "use client";

// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/24/solid";

// function Pagination({
//   postCount,
//   limit,
// }: {
//   postCount: number;
//   limit: number;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const pageParam = Number(searchParams?.get("page"));

//   const numberOfPages = Math.ceil(postCount / limit);
//   const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

//   const handlePaginate = (page: number) => {
//     if (pageParam === page) return;

//     const path = searchParams?.has("sort")
//       ? `${pathname}?sort=${searchParams.get(
//           "sort"
//         )}&page=${page}&limit=${limit}`
//       : `${pathname}?page=${page}&limit=${limit}`;

//     router.push(path);

//     // router.push(`${pathname}?${searchParams}&page=${page}&limit=${limit}`);

//     // const path = route
//     //   ? `/${route}?page=${page}&limit=${limit}`
//     //   : `/${pathname}?page=${page}&limit=${limit}`;

//     // router.push(path);

//     // if (page === 1) {
//     //   if (!pageParam) return;
//     //   router.push(`/${pathname}`);
//     // } else {
//     //   router.push(`/${pathname}?page=${page}&limit=${limit}`);
//     // }
//   };

//   const handleNext = () => {
//     if (pageParam >= numberOfPages) return;

//     const nextPage = pageParam === 0 ? 2 : pageParam + 1;

//     const path = searchParams?.has("sort")
//       ? `${pathname}?sort=${searchParams.get(
//           "sort"
//         )}&page=${nextPage}&limit=${limit}`
//       : `${pathname}?page=${nextPage}&limit=${limit}`;

//     router.push(path);

//     // router.push(`${pathname}?page=${nextPage}&limit=${limit}`);

//     // const path = route
//     //   ? `/${route}?page=${nextPage}&limit=${limit}`
//     //   : `/${pathname}?page=${nextPage}&limit=${limit}`;

//     // router.push(path);
//   };

//   const handleLast = () => {
//     // if (pageParam >= numberOfPages) return;

//     // const nextPage = pageParam === 0 ? 2 : pageParam + 1;

//     const path = searchParams?.has("sort")
//       ? `${pathname}?sort=${searchParams.get(
//           "sort"
//         )}&page=${numberOfPages}&limit=${limit}`
//       : `${pathname}?page=${numberOfPages}&limit=${limit}`;

//     router.push(path);

//     // router.push(`${pathname}?page=${numberOfPages}&limit=${limit}`);

//     // const path = route
//     //   ? `/${route}?page=${numberOfPages}&limit=${limit}`
//     //   : `/${pathname}?page=${numberOfPages}&limit=${limit}`;

//     // router.push(path);
//   };

//   const handlePrev = () => {
//     if (pageParam <= 1) return;

//     const prevPage = pageParam - 1;

//     const path = searchParams?.has("sort")
//       ? `${pathname}?sort=${searchParams.get(
//           "sort"
//         )}&page=${prevPage}&limit=${limit}`
//       : `${pathname}?page=${prevPage}&limit=${limit}`;

//     router.push(path);

//     // router.push(`${pathname}?page=${prevPage}&limit=${limit}`);

//     // const path = route
//     //   ? `/${route}?page=${prevPage}&limit=${limit}`
//     //   : `/${pathname}?page=${prevPage}&limit=${limit}`;

//     // router.push(path);

//     // prevPage === 1
//     //   ? router.push(`/${pathname}`)
//     //   : router.push(`/${pathname}?page=${prevPage}&limit=${limit}`);
//   };

//   const handleFirst = () => {
//     // router.push(`/${pathname}`);

//     const path = searchParams?.has("sort")
//       ? `${pathname}?sort=${searchParams.get("sort")}&page=1&limit=${limit}`
//       : `${pathname}?page=1&limit=${limit}`;

//     router.push(path);

//     // router.push(`${pathname}?page=1&limit=${limit}`);

//     // const path = route
//     //   ? `/${route}?page=1&limit=${limit}`
//     //   : `/${pathname}?page=1&limit=${limit}`;

//     // router.push(path);
//   };

//   return (
//     <div className="flex items-center justify-center gap-2 mb-10 text-xs">
//       <button
//         className="paginateButton"
//         onClick={handleFirst}
//         disabled={pageParam <= 1}
//       >
//         <ChevronDoubleLeftIcon className="h-4 w-4" />
//       </button>

//       <button
//         className="paginateButton"
//         onClick={handlePrev}
//         disabled={pageParam <= 1}
//       >
//         <ChevronLeftIcon className="h-4 w-4" />
//       </button>

//       <div className="flex overflow-x-auto sm:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
//         {pages.map((page) => (
//           // <Link
//           //   key={page}
//           //   href={`/?page=${page}&limit=${limit}`}
//           //   shallow={false}
//           // >
//           //   {page}
//           // </Link>
//           <button
//             key={page}
//             className={`px-2.5 py-2 border first:border-l border-l-0 border-gray-400 dark:border-gray-600 disabled:cursor-not-allowed  ${
//               page === pageParam || (page === 1 && !pageParam)
//                 ? "bg-cyan-300 dark:bg-gray-700"
//                 : "bg-transparent hover:bg-cyan-200 dark:hover:bg-gray-800 "
//             }`}
//             onClick={() => handlePaginate(page)}
//             disabled={page === pageParam || (page === 1 && !pageParam)}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <button
//         className="paginateButton"
//         onClick={handleNext}
//         disabled={pageParam === numberOfPages}
//       >
//         <ChevronRightIcon className="h-4 w-4" />
//       </button>

//       <button
//         className="paginateButton"
//         onClick={handleLast}
//         disabled={pageParam === numberOfPages}
//       >
//         <ChevronDoubleRightIcon className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }

// export default Pagination;

"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  // ChevronDoubleLeftIcon,
  // ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import "./styles.css";

function Pagination({
  postCount,
  limit,
}: {
  postCount: number;
  limit: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams?.get("page")) || 1
  );

  const pagesToShow = 5; // adjust this based on your preference
  const pagesBeforeCurrent = Math.floor(pagesToShow / 2);
  const pagesAfterCurrent = pagesToShow - pagesBeforeCurrent - 1;

  const numberOfPages = Math.ceil(postCount / limit);

  let pages: number[] = [];

  if (numberOfPages <= pagesToShow) {
    pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  } else if (currentPage <= pagesBeforeCurrent + 1) {
    pages = Array.from({ length: pagesToShow }, (_, i) => i + 1);
    if (pages[pages.length - 1] < numberOfPages - 1) {
      pages.push(-1);
    }
    pages.push(numberOfPages);
  } else if (currentPage >= numberOfPages - pagesAfterCurrent) {
    pages = Array.from(
      { length: pagesToShow },
      (_, i) => numberOfPages - pagesToShow + i + 1
    );
    if (pages[0] > 2) {
      pages.unshift(-1);
    }
    pages.unshift(1);
  } else {
    pages = Array.from(
      { length: pagesToShow },
      (_, i) => currentPage - pagesBeforeCurrent + i
    );
    if (pages[0] > 2) {
      pages.unshift(-1);
    }
    pages.unshift(1);
    if (pages[pages.length - 1] < numberOfPages - 1) {
      pages.push(-1);
    }
    pages.push(numberOfPages);
  }

  const handlePaginate = (page: number) => {
    if (currentPage === page) return;

    const path = searchParams?.has("sort")
      ? `${pathname}?sort=${searchParams.get(
          "sort"
        )}&page=${page}&limit=${limit}`
      : `${pathname}?page=${page}&limit=${limit}`;

    router.push(path);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage >= numberOfPages) return;

    const nextPage = currentPage + 1;

    const path = searchParams?.has("sort")
      ? `${pathname}?sort=${searchParams.get(
          "sort"
        )}&page=${nextPage}&limit=${limit}`
      : `${pathname}?page=${nextPage}&limit=${limit}`;

    router.push(path);
    setCurrentPage(nextPage);
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;

    const prevPage = currentPage - 1;

    const path = searchParams?.has("sort")
      ? `${pathname}?sort=${searchParams.get(
          "sort"
        )}&page=${prevPage}&limit=${limit}`
      : `${pathname}?page=${prevPage}&limit=${limit}`;

    router.push(path);
    setCurrentPage(prevPage);
  };

  // const handleLast = () => {
  //   const path = searchParams?.has("sort")
  //     ? `${pathname}?sort=${searchParams.get(
  //         "sort"
  //       )}&page=${numberOfPages}&limit=${limit}`
  //     : `${pathname}?page=${numberOfPages}&limit=${limit}`;

  //   router.push(path);
  //   setCurrentPage(numberOfPages);
  // };

  // const handleFirst = () => {
  //   const path = searchParams?.has("sort")
  //     ? `${pathname}?sort=${searchParams.get("sort")}&page=1&limit=${limit}`
  //     : `${pathname}?page=1&limit=${limit}`;

  //   router.push(path);
  //   setCurrentPage(1);
  // };

  return (
    <div className="flex items-start justify-center gap-2 mb-10 text-sm">
      <div>
        {/* <button
          className="paginateArrowButton"
          onClick={handleFirst}
          disabled={currentPage <= 1}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button> */}

        <button
          className="paginateArrowButton"
          onClick={handlePrev}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2 h-[40px] overflow-x-auto">
        <div className="flex gap-2">
          {pages.map((page, i) => (
            <button
              key={i}
              className={cn("paginateNumberButton", {
                "!bg-blue-500 text-white": page === currentPage,
                "hover:!bg-white dark:hover:!bg-custom-gray3 !text-black dark:!text-white !cursor-default":
                  page === -1,
              })}
              onClick={() => handlePaginate(page)}
              disabled={page === -1 || page === currentPage}
            >
              {page === -1 ? "..." : page}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          className="paginateArrowButton"
          onClick={handleNext}
          disabled={currentPage === numberOfPages}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        {/* <button
          className="paginateArrowButton"
          onClick={handleLast}
          disabled={currentPage === numberOfPages}
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button> */}
      </div>
    </div>
  );
}

export default Pagination;
