"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { adminLinks } from "./adminLinks";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import { MoonIcon } from "@heroicons/react/24/outline";
import DarkMode from "../DarkMode";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

function AdminSidebar({
  node,
  showSidebar,
  setShowSidebar,
  role,
}: {
  node: React.RefObject<HTMLDivElement>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  role: string | undefined;
}) {
  const pathname = usePathname();

  const adminType =
    role &&
    (role === "ADMIN" ? "Admin" : role === "GUEST_ADMIN" ? "Guest Admin" : "");

  const activeClass = (path: string, name: string) => {
    const paths = pathname?.split("/");

    if (pathname === path || paths?.includes(name.toLowerCase())) {
      return "bg-cyan-200 dark:bg-cyan-900";
    }

    return "text-custom-blue2 hover:bg-cyan-200/50 dark:hover:bg-cyan-900/50";
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("overflow-y-hidden");
    }

    return () => document.body.classList.remove("overflow-y-hidden");
  }, [showSidebar]);

  const handleSignOut = () => {
    signOut({
      // redirect: false,
      // callbackUrl: `${window.location.origin}/admin/signin`,
      callbackUrl: `${window.location.origin}${pathname}`,
    });
  };

  return (
    <div
      className={` 
        ${
          showSidebar &&
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:bg-transparent"
        }
      `}
    >
      <div
        ref={node}
        className={`h-[100dh] lg:h-screen overflow-y-auto bg-gray-50 dark:bg-custom-gray6 shadow-md z-30 top-0 bottom-0 fixed lg:sticky lg:translate-x-0 w-[264px] lg:w-[290px] ease-out transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }
      `}
      >
        <div className="flex flex-col justify-between h-full overflow-hidden">
          <div>
            <div className="pl-5 lg:pl-[30px] py-7 font-semibold flex justify-between items-center">
              <h1 className="font-montserrat text-lg lg:text-2xl">
                Techpost Admin
              </h1>
              <span
                className="p-1 mr-5 rounded-full border-2 border-gray-500  lg:hidden"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </span>
            </div>

            {/* <ScrollArea className="mt-3 my-0 h-[620px] "> */}
            <div className="mx-2 lg:mx-[25px] space-y-2 font-montserrat">
              {adminLinks?.map((navLink, i) => (
                <div key={i}>
                  <Link href={navLink.link}>
                    <div
                      className={`px-3 py-3 flex justify-between items-center font-semibold  rounded-lg ${activeClass(
                        navLink.link,
                        navLink.name
                      )}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-5 w-5">{navLink.icon}</span>

                        <p className="text-sm">{navLink.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* </ScrollArea> */}
          </div>

          <div className="mb-6 p-2 lg:p-5">
            <Separator className="my-4 bg-gray-300 dark:bg-gray-600" />

            <div className="space-y-2">
              <div className="px-3 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3 font-montserrat font-semibold rounded-lg">
                  <span className="h-5 w-5">
                    <MoonIcon className="stroke-blue-600 dark:stroke-blue-300" />
                  </span>
                  <p className="text-sm">Dark Theme</p>
                </div>

                <DarkMode />
              </div>

              <div className="flex flex-col items-center gap-3 p-3 bg-gray-600/10 dark:bg-gray-400/10 rounded-lg">
                <p className="font-medium text-sm text-gray-600 dark:text-gray-300">
                  {`Signed in as ${adminType}`}
                </p>
                {role === "GUEST_ADMIN" && (
                  <p className="text-center font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">{`Limited access for guest admin (view only)`}</p>
                )}

                <div className="flex justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    aria-label="sign out"
                    className="flex items-center gap-1 min-w-[130px] rounded-full border border-gray-400 hover:border-black hover:text-white hover:bg-black dark:border-gray-500 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    onClick={handleSignOut}
                  >
                    <span className="h-5 w-5">
                      <ArrowLeftOnRectangleIcon className="stroke-red-600 dark:stroke-red-300" />
                    </span>
                    <p>Sign Out</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
