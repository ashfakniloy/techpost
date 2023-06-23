"use client";

import Link from "next/link";
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

type Category = {
  name: string;
  _count: {
    posts: number;
  };
};

function Navbar({
  session,
  imageUrl,
  username,
  categories,
}: {
  session: Session | null;
  categories: Category[];
  imageUrl?: string | null;
  username?: string;
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

  // console.log("session from server", session);

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  const getNavLinks = () => {
    if (session) {
      return navLinksSigned(categories);
    } else {
      return navLinksUnsigned(categories);
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between py-4 border-gray-300 bg-gray-100 bg-opacity-50 dark:bg-custom-gray/30 backdrop-blur-md dark:border-zinc-700">
        <div className="text-4xl font-bold font-montserrat">
          <Link href="/">logo</Link>
        </div>

        <div className="flex items-center gap-6 lg:gap-10">
          <div className="hidden lg:block">
            <SearchButton />
          </div>
          <div className="lg:hidden">
            <SearchButtonMobile />
          </div>
          <ThemeButton />
          <button
            className="p-1 lg:hidden"
            aria-label="toggle"
            onClick={() => setShowSidebar(true)}
          >
            <Bars3Icon className="w-7 h-7" />
          </button>

          <div className="items-center hidden gap-6 text-sm font-bold text-gray-800 lg:flex lg:gap-10 font-montserrat dark:text-gray-300">
            <NavMenu navLinks={navLinks} />

            <NavButtons
              session={session}
              username={username}
              imageUrl={imageUrl}
            />
          </div>
        </div>
      </div>

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          sidebarNode={sidebarNode}
          session={session}
          imageUrl={imageUrl}
          username={username}
          navLinks={navLinks}
          showSidebarSubMenu={showSidebarSubMenu}
          setShowSidebarSubMenu={setShowSidebarSubMenu}
        />
      )}
    </>
  );
}

export default Navbar;
