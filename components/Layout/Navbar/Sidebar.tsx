"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

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
  | {
      name: string;
      link: string;
      subLinks: {
        name: string;
        link: string;
      }[];
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
    }).then(() => {
      localStorage.removeItem("draftPost");
    });
  };

  // for closing the sidebarSubmenu when clicking on a link without submenu. closing the submenu with onClick on links causes the submenu to close before the sidebar closes.
  useEffect(() => {
    const links = navLinks.map((navLink) => navLink.link);

    links.includes(pathnameDecoded) && setShowSidebarSubMenu(null);
  }, [pathnameDecoded]);

  const activeSubLinkClass = (
    subLinks: { name: string; link: string }[] | undefined,
    navName: string
  ) => {
    const value = subLinks?.find((subLink) => subLink.link === pathnameDecoded);

    if (pathnameDecoded === value?.link && showSidebarSubMenu !== navName) {
      return "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
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
      className={`${
        showSidebar &&
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:bg-transparent"
      }`}
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
              type="button"
              aria-label="hide sidebar"
              className="self-end p-1 mb-3 mr-1"
              onClick={() => setShowSidebar(false)}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>

            <div className="mt-4 mb-7">
              {session && session.user.role === "USER" ? (
                <div className="flex gap-5 p-3 bg-gray-200 rounded-lg dark:bg-custom-gray3">
                  <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="user image"
                        fill
                        sizes="50px"
                        className="object-cover"
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

                  <div>
                    <p className="font-medium">Signed in as </p>
                    <p className="font-bold capitalize">{username}</p>
                    <Button
                      type="button"
                      aria-label="sign out"
                      size="sm"
                      className="mt-3 mb-1 min-w-[120px] rounded-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link href="/signup">
                    <Button
                      type="button"
                      size="sm"
                      aria-label="sign up"
                      variant="outline"
                      className="min-w-[120px] border-gray-600 dark:border-gray-300"
                    >
                      Sign Up
                    </Button>
                  </Link>

                  <Link href="/signin">
                    <Button
                      type="button"
                      aria-label="sign in"
                      size="sm"
                      className="min-w-[120px]"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-1 font-montserrat">
              {navLinks.map((navLink) => (
                <div key={navLink.name}>
                  {!navLink.subLinks ? (
                    <Link href={navLink.link}>
                      <p
                        className={`py-3 pl-5 rounded-lg ${
                          pathnameDecoded === navLink.link &&
                          "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                        // onClick={() => setShowSidebarSubMenu(null)} //it causes submenu to close before the sidebar closes. so i had to use useEffect
                      >
                        {navLink.name}
                      </p>
                    </Link>
                  ) : (
                    <div>
                      {!navLink.link ? (
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
                              showSidebarSubMenu === navLink.name &&
                              "rotate-180"
                            }`}
                          >
                            <ChevronDownIcon className="w-4 h-4" />
                          </span>
                        </p>
                      ) : (
                        <Link href={navLink.link}>
                          <p
                            className={`py-3 pl-5 rounded-lg cursor-pointer flex items-center gap-1 ${activeSubLinkClass(
                              navLink.subLinks,
                              navLink.name
                            )}`}
                          >
                            {navLink.name}
                          </p>
                        </Link>
                      )}

                      <div
                        className={`mt-1 space-y-1 transition-[grid-template-rows] duration-300 ease-linear grid ${
                          showSidebarSubMenu === navLink.name
                            ? "grid-rows-[1fr] "
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden space-y-1">
                          {navLink.subLinks?.map((subLink, i) => (
                            <div key={subLink.name}>
                              <Link href={subLink.link}>
                                <p
                                  className={`py-3 pl-10 rounded-lg capitalize ${
                                    pathnameDecoded === subLink.link &&
                                    "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                  }`}
                                >
                                  {subLink.name}
                                </p>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
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
