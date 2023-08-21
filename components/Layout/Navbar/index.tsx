"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import useToggle from "@/hooks/useToggle";
import SearchButton from "./Search/SearchButton";
import ThemeButton from "@/components/Theme/ThemeButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { use, useEffect, useState } from "react";
import SearchButtonMobile from "./Search/SearchButtonMobile";
import NavMenu from "./NavMenu";
import NavButtons from "./NavButtons";
import { navLinksSigned, navLinksUnsigned } from "./navLinks";
import { BASE_URL } from "@/config";

type Category = {
  name: string;
  _count: {
    posts: number;
  };
};

// async function fetchCategories() {
//   // await new Promise((resolve) => setTimeout(resolve, 10000));

//   const res = await fetch(`${BASE_URL}/api/nav`);

//   return res.json();
// }

// const dataPromise = fetchCategories();

function Navbar({
  session,
  categories,
}: {
  session: Session | null;
  categories: Category[];
}) {
  const pathname = usePathname();

  // const categories = use(dataPromise);

  // const [categories, setCategories] = useState("");

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const res = await fetch(`${BASE_URL}/api/nav`);
  //     const data = await res.json();

  //     if (res.ok) {
  //       setCategories(data);
  //     } else {
  //       console.log("error", data);
  //     }

  //   getCategories()
  //   };
  // }, []);

  // console.log("categories", categories);

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
    if (session && session.user.role === "USER") {
      return navLinksSigned(categories);
    } else {
      return navLinksUnsigned(categories);
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <header className="sticky top-0 px-0.5 lg:px-1.5 z-20 flex items-center justify-between py-4 border-gray-300 bg-gray-100 bg-opacity-50 dark:bg-custom-gray/30 backdrop-blur-md dark:border-zinc-700">
        <div className="text-xl lg:text-2xl font-extrabold font-montserrat uppercase group px-1.5 py-1 rounded bg-custom-gray3 select-none">
          <Link href="/">
            <span className="text-white lg:group-hover:text-lime-500 transition-color duration-300">
              TECH
            </span>
            <span className="text-lime-500 lg:group-hover:text-white transition-color duration-300">
              POST
            </span>
          </Link>
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
