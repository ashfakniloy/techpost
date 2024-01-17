"use client";

import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import useToggle from "@/hooks/useToggle";
import SearchButton from "./Search/SearchButton";
import ThemeButton from "@/components/Theme/ThemeButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SearchButtonMobile from "./Search/SearchButtonMobile";
import NavMenu from "./NavMenu";
import NavButtons from "./NavButtons";
import { navLinksSigned, navLinksUnsigned } from "./navLinks";
import TechpostLogo from "../TechpostLogo";

function Navbar({
  session,
  categories,
}: {
  session: Session | null;
  categories: CategoryProps[];
}) {
  const pathname = usePathname();

  const {
    node: sidebarNode,
    toggle: showSidebar,
    setToggle: setShowSidebar,
  } = useToggle();

  const [showSidebarSubMenu, setShowSidebarSubMenu] = useState<string | null>(
    null
  );

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  const getNavLinks = () => {
    if (session && session.user.role === "USER") {
      return navLinksSigned(categories);
    } else {
      return navLinksUnsigned(categories);
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <header className="sticky top-0 px-0.5 lg:px-1.5 z-30 flex items-center justify-between py-4 border-gray-300 bg-gray-100 bg-opacity-50 dark:bg-custom-gray/30 backdrop-blur-md dark:border-zinc-700">
        <TechpostLogo />

        <div className="flex items-center gap-6 lg:gap-10">
          <div className="hidden lg:block">
            <SearchButton />
          </div>
          <div className="lg:hidden">
            <SearchButtonMobile />
          </div>

          <div className="h-6 w-6 flex justify-center items-center">
            <ThemeButton />
          </div>

          <button
            type="button"
            aria-label="sidebar toggle"
            className="p-1 lg:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <Bars3Icon className="w-7 h-7" />
          </button>

          <div className="items-center hidden gap-6 text-sm font-bold text-gray-800 lg:flex lg:gap-10 font-montserrat dark:text-gray-300">
            <NavMenu navLinks={navLinks} />

            <NavButtons
              session={session}
              username={session?.user.username}
              imageUrl={session?.user.imageUrl}
            />
          </div>
        </div>
      </header>

      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        sidebarNode={sidebarNode}
        session={session}
        imageUrl={session?.user.imageUrl}
        username={session?.user.username}
        navLinks={navLinks}
        showSidebarSubMenu={showSidebarSubMenu}
        setShowSidebarSubMenu={setShowSidebarSubMenu}
      />
    </>
  );
}

export default Navbar;
