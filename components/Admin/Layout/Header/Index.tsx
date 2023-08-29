"use client";

import useToggle from "@/hooks/useToggle";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

function AdminHeader({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toggle, setToggle, node } = useToggle();

  const handleSignout = () => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}/admin`,
    });
  };

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

          <div className="absolute w-full flex justify-center items-center inset-x-0 text-xl mx-auto text-custom-blue4 font-bold lg:hidden">
            TechPost Admin
          </div>

          {/* <div className="flex justify-between items-center gap-5 lg:gap-[80px]">
            <div className="hidden lg:flex justify-between items-center gap-12  text-base font-semibold">
              <p>Signed in as Admin</p>
            </div>

            <button
              className="hidden lg:block bg-custom-blue5 hover:bg-opacity-80 active:scale-95 text-sm  font-semibold px-2 py-1 lg:px-4 lg:py-2 rounded-lg transition duration-200"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div> */}

          {/* <button
            className="lg:hidden  p-1 rounded-full border-2 "
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button> */}
        </div>
      </div>
      <div
        ref={node}
        className={`lg:hidden flex flex-col items-center bg-custom-blue5 absolute top-[68px] w-full py-7 text-sm font-semibold shadow-md ease-out duration-300 z-10
            ${toggle ? "translate-y-0" : "-translate-y-full shadow-none"}`}
      >
        <p className="py-3">Signed in as Admin</p>
        <button
          type="button"
          aria-label="sign out"
          className="mt-2 px-5  py-3 bg-custom-blue hover:bg-opacity-80 text-sm rounded-lg active:scale-95 transition duration-200"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
