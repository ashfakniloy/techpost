"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MyProfileNav() {
  const pathname = usePathname();

  const profilePages = [
    {
      name: "Posts",
      link: "/my-profile/posts",
    },
    // {
    //   name: "Activity Log",
    //   link: "/my-profile/activity-log",
    // },
    {
      name: "Edit Profile",
      link: "/my-profile/edit-profile",
    },
    {
      name: "Account Setting",
      link: "/my-profile/account-setting",
    },
  ];

  return (
    <div className="flex border-b gap-4 lg:gap-0 sticky top-[74px] bg-gray-100 dark:bg-custom-gray z-20 border-gray-300 dark:border-gray-700 text-center text-sm lg:text-base font-montserrat font-medium whitespace-nowrap">
      {profilePages.map((page) => (
        <div key={page.name} className="w-full relative">
          <Link href={page.link}>
            <div
              className={`py-3 ${
                pathname === page.link
                  ? "text-blue-600 dark:text-blue-500"
                  : "hover:bg-gray-300/50 dark:hover:bg-custom-gray2"
              } `}
            >
              <p>{page.name}</p>
              {pathname === page.link && (
                <div className="absolute rounded -bottom-[1px] inset-x-0 border-t-2 border-blue-500"></div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyProfileNav;
