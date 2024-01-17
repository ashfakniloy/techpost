"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { PostsActions } from "../actions/PostsActions";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { PostAdminTypes } from "@/db/queries/admin/getAllPostsAdmin";

export const userPostsColumn: ColumnDef<PostAdminTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        key={row.original.id}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="w-[400px]">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("categoryName")}</div>
    ),
  },

  {
    accessorKey: "_count.likes",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Likes" />
    ),
    cell: ({
      row: {
        original: {
          _count: { likes },
        },
      },
    }) => <div className="w-[100px]">{likes}</div>,
  },
  {
    accessorKey: "_count.comments",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Comments" />
    ),
    cell: ({
      row: {
        original: {
          _count: { comments },
        },
      },
    }) => <div className="w-[100px]">{comments}</div>,
  },
  {
    accessorKey: "_count.views",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Views" />
    ),
    cell: ({
      row: {
        original: {
          _count: { views },
        },
      },
    }) => <div className="w-[100px]">{views}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Created at" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        <ClientFormattedDate date={row.getValue("createdAt")} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="w-[0px]">
        <PostsActions row={row} />
      </div>
    ),
  },
];
