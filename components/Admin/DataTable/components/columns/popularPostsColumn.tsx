"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import Link from "next/link";
import type { PostItem } from "@/types";

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
];
