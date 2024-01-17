"use client";

import {
  ChartPieIcon,
  UsersIcon,
  NewspaperIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Paths from "./Paths";

type IconMappings = {
  [key: string]: JSX.Element;
};

const iconMappings: IconMappings = {
  users: <UsersIcon />,
  posts: <NewspaperIcon />,
  categories: <Squares2X2Icon />,
};

function PageTitle() {
  const pathname = usePathname();
  const pathnameDecoded = decodeURIComponent(pathname!!);
  const pageTitle =
    pathnameDecoded === "/admin"
      ? "dashboard"
      : pathnameDecoded?.split("/admin/").join("");

  const pathSegments = pathname?.split("/").filter((path) => path !== "");

  const getIcon = () => {
    if (pathname === "/admin") {
      return <ChartPieIcon />;
    } else {
      const pageName = pathSegments?.find((path) => path in iconMappings);

      const IconComponent = pageName ? iconMappings[pageName] : null;
      return IconComponent;
    }
  };

  const pageIcon = getIcon();

  return (
    <>
      <div className="flex  lg:items-center gap-1 lg:gap-3">
        <span className="h-6 w-6 lg:h-[30px] lg:w-[30px] flex-shrink-0">
          {pageIcon}
        </span>
        <h1 className="lg:text-2xl font-montserrat font-bold capitalize">
          {pageTitle}
        </h1>
      </div>

      <Paths />
    </>
  );
}

export default PageTitle;
