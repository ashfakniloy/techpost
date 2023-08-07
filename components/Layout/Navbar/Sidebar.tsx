"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

type NavLinksProps = (
  | {
      name: string;
      link: string;
      subLinks?: undefined;
    }
  | {
      name: string;
      subLinks: {
        name: string;
        link: string;
      }[];
      link?: undefined;
    }
)[];

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarNode: React.RefObject<HTMLDivElement>;
  session: Session | null;
  imageUrl?: string | null;
  username?: string;
  navLinks: NavLinksProps;
  showSidebarSubMenu: string | null;
  setShowSidebarSubMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

function Sidebar({
  showSidebar,
  setShowSidebar,
  sidebarNode,
  session,
  imageUrl,
  username,
  navLinks,
  showSidebarSubMenu,
  setShowSidebarSubMenu,
}: SidebarProps) {
  const pathname = usePathname();
  const pathnameDecoded = pathname && decodeURIComponent(pathname);

  const handleSignOut = () => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}${pathname}`,
    });

    // router.refresh();
    // router.push("/signin");
  };

  // for closing the sidebarSubmenu when clicking on a link without submenu. closing the submenu with onClick on links causes the submenu to close before the sidebar closes.
  useEffect(() => {
    const subLinks = navLinks
      .flatMap((navLink) => navLink.subLinks?.map((subLink) => subLink.link))
      .filter((link) => link !== undefined);

    pathnameDecoded &&
      !subLinks.includes(pathnameDecoded) &&
      setShowSidebarSubMenu(null);
  }, [pathnameDecoded]);

  const activeSubLinkClass = (
    subLinks: { name: string; link: string }[] | undefined,
    navName: string
  ) => {
    const value = subLinks?.find((subLink) => subLink.link === pathnameDecoded);

    if (pathnameDecoded === value?.link && showSidebarSubMenu !== navName) {
      return "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
    } else {
      return "hover:bg-gray-200 dark:hover:bg-gray-600";
    }
  };

  const menu = (navName: string | null) => {
    if (showSidebarSubMenu === navName) {
      return setShowSidebarSubMenu(null);
    }
    setShowSidebarSubMenu(navName);
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("overflow-y-hidden");
    }

    return () => document.body.classList.remove("overflow-y-hidden");
  }, [showSidebar]);

  return (
    <div
      className={
        showSidebar
          ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:bg-transparent"
          : ""
      }
    >
      <div
        ref={sidebarNode}
        className={`overflow-y-auto lg:hidden h-screen text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-custom-gray2 z-30 fixed inset-y-0 right-0 w-[270px] transition-all ease-out duration-300 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }
    `}
      >
        <div className="flex flex-col px-2 py-5 mb-20 text-sm font-bold">
          <div className="flex flex-col">
            <button
              className="self-end p-1 mb-3 mr-1 transition duration-300 hover:rotate-90"
              onClick={() => setShowSidebar(false)}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>

            <div className="mt-4 mb-7">
              {session && session.user.role === "USER" ? (
                <div className="flex gap-5 p-3 bg-gray-200 rounded-lg dark:bg-custom-gray3">
                  <div className="">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="user image"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="/images/blankUser.jpg"
                        alt="user image"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    )}
                  </div>

                  <div className="">
                    <p className="font-medium">Signed in as </p>
                    <p className="font-bold">{username}</p>
                    <button
                      className="mt-3 w-[120px] py-2 text-sm font-bold text-gray-100 rounded-full bg-gray-800 dark:bg-stone-600"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link href="/signup">
                    <button className="w-[120px] py-2 text-sm font-bold bg-transparent border-2 border-gray-400 dark:hover:bg-gray-400 dark:hover:text-gray-900 rounded-md">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/signin">
                    <button className="w-[120px] py-2 text-sm font-bold bg-gray-900 border-gray-900 text-gray-200 dark:text-gray-900 border-2 dark:border-gray-200 dark:bg-gray-200  rounded-md">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-1">
              {navLinks.map((navLink) => (
                <div key={navLink.name} className="">
                  {navLink.link ? (
                    <Link href={navLink.link}>
                      <p
                        className={`py-3 pl-5 rounded-lg ${
                          pathnameDecoded === navLink.link
                            ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                        // onClick={() => setShowSidebarSubMenu(null)} //it causes submenu to close before the sidebar closes. so i had to use useEffect
                      >
                        {navLink.name}
                      </p>
                    </Link>
                  ) : (
                    <div className="">
                      <p
                        onClick={() => menu(navLink.name)}
                        className={`py-3 pl-5 rounded-lg cursor-pointer flex items-center gap-1 ${activeSubLinkClass(
                          navLink.subLinks,
                          navLink.name
                        )}`}
                      >
                        {navLink.name}
                        <span
                          className={`${
                            showSidebarSubMenu === navLink.name && "rotate-180"
                          }`}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </span>
                      </p>

                      {/* <div
                        className={`mt-1 space-y-1 overflow-hidden transition-all duration-500 ease-out ${
                          showSidebarSubMenu === navLink.name
                            ? "max-h-screen" //css cant animate height auto. max-h is a quick solution. im guessing max-h might not be greater than screen height.
                            : "max-h-0"
                        }`}
                      >
                        {navLink.subLinks?.map((subLink, i) => (
                          <div key={subLink.name} className="">
                            <Link href={subLink.link}>
                              <p
                                className={`py-3 pl-10 rounded-lg capitalize ${
                                  pathnameDecoded === subLink.link
                                    ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                              >
                                {subLink.name}
                              </p>
                            </Link>
                          </div>
                        ))}
                      </div> */}

                      {showSidebarSubMenu === navLink.name && (
                        <div className="mt-1 space-y-1">
                          {navLink.subLinks?.map((subLink, i) => (
                            <div key={subLink.name} className="">
                              <Link href={subLink.link}>
                                <p
                                  className={`py-3 pl-10 rounded-lg capitalize ${
                                    pathnameDecoded === subLink.link
                                      ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                      : "hover:bg-gray-200 dark:hover:bg-gray-600"
                                  }`}
                                >
                                  {subLink.name}
                                </p>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
