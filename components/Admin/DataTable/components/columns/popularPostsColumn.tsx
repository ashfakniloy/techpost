"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
// import { PostsActions } from "../actions/PostsActions";
// import { ClientFormattedDate } from "@/components/ClientFormattedDate";
// import { PostAdminTypes } from "@/db/queries/admin/getAllPostsAdmin";
import Link from "next/link";
// import { Post } from "@prisma/client";
import type { PostItem } from "@/types";

// type PostProps = PostItem & {
//   user: {
//     username: string;
//   };
// };

export const popularPostsColumn: ColumnDef<PostItem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    // cell: ({ row }) => <div className="w-[400px]">{row.getValue("title")}</div>,
    cell: ({
      row: {
        original: { title, slug },
      },
    }) => (
      <div className="w-[400px]">
        <Link className="hover:underline" href={`/admin/posts/${slug}`}>
          {title}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("categoryName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({
      row: {
        original: {
          user: { username },
        },
      },
    }) => <div className="w-[100px]">{username}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <div className="w-[0px]">
  //       <PostsActions row={row} />
  //     </div>
  //   ),
  // },
];
