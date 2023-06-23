"use client";

import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <button
      className="text-sm font-medium px-2.5 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-stone-700 text-gray-500 dark:text-gray-400  hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 ease-out"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
}

export default BackButton;
