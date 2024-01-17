// not using
"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

function ViewToggle({ cookieView }: { cookieView: string | undefined }) {
  const router = useRouter();

  const handleView = (view: string) => {
    Cookies.set("view", view);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 ">
      <p className="text-xs lg:text-sm">View:</p>
      <button
        type="button"
        aria-label="list view"
        className={`h-6 w-6 p-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
          (!cookieView || cookieView === "list") &&
          "bg-gray-300 dark:bg-gray-700"
        }`}
        onClick={() => handleView("list")}
      >
        <ListBulletIcon />
      </button>
      <button
        type="button"
        aria-label="grid view"
        className={`h-6 w-6 p-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
          cookieView === "grid" && "bg-gray-300 dark:bg-gray-700"
        }`}
        onClick={() => handleView("grid")}
      >
        <Squares2X2Icon />
      </button>
    </div>
  );
}

export default ViewToggle;

// import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
// import { cookies } from "next/headers";

// function ViewToggle({ cookieView }: { cookieView: string | undefined }) {
//   const listAction = async () => {
//     "use server";

//     cookies().set("view", "list");
//   };

//   const gridAction = async () => {
//     "use server";

//     cookies().set("view", "grid");
//   };

//   return (
//     <div className="flex items-center gap-2 ">
//       <p className="text-xs lg:text-sm">View:</p>

//       <form action={listAction}>
//         <button
//           className={`h-6 w-6 p-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
//             (!cookieView || cookieView === "list") &&
//             "bg-gray-300 dark:bg-gray-700"
//           }`}
//         >
//           <ListBulletIcon />
//         </button>
//       </form>

//       <form action={gridAction}>
//         <button
//           className={`h-6 w-6 p-0.5 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded ${
//             cookieView === "grid" && "bg-gray-300 dark:bg-gray-700"
//           }`}
//         >
//           <Squares2X2Icon />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ViewToggle;
