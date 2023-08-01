import {
  ChartPieIcon,
  NewspaperIcon,
  UsersIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export const adminLinks = [
  {
    name: "Homepage",
    link: "/admin",
    icon: <ChartPieIcon className="stroke-blue-600 dark:stroke-blue-300" />,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: <UsersIcon className="stroke-blue-600 dark:stroke-blue-300" />,
  },
  {
    name: "Posts",
    link: "/admin/posts",
    icon: <NewspaperIcon className="stroke-blue-600 dark:stroke-blue-300" />,
  },
  {
    name: "Categories",
    link: "/admin/categories",
    icon: <Squares2X2Icon className="stroke-blue-600 dark:stroke-blue-300" />,
  },
];
