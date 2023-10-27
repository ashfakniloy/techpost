"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";

function AdminHeader({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="sticky top-0 z-20 lg:hidden">
      <div className="relative z-20">
        <div className="relative  bg-gray-50 dark:bg-custom-gray6 h-[68px] w-full flex justify-between lg:justify-end items-center shadow-md  px-5 z-30">
          <button
            type="button"
            aria-label="sidebar toggle"
            className="lg:hidden z-10"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Bars3Icon className="h-8 w-8" />
          </button>

          <div className="absolute w-full flex justify-center items-center inset-x-0 text-xl mx-auto font-montserrat font-bold lg:hidden">
            Techpost Admin
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
