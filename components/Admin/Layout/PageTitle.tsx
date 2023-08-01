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

  // console.log("pathSegments", pathSegments);

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

  // const pageIcon = () => {
  //   const isPath = (title: string) => pathNames.includes(title);

  //   if (pathname === "/admin") {
  //     return <ChartPieIcon />;
  //   } else {
  //     switch (true) {
  //       case isPath("users"):
  //         return <UsersIcon />;

  //       case isPath("posts"):
  //         return <NewspaperIcon />;

  //       case isPath("categories"):
  //         return <Squares2X2Icon />;

  //       default:
  //         break;
  //     }
  //   }
  // };

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="h-[30px] w-[30px]">{pageIcon}</span>
        <h1 className="text-2xl font-bold capitalize">{pageTitle}</h1>
      </div>

      <Paths />
    </>
  );
}

export default PageTitle;
