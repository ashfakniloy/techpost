"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";

// import { CommentLike } from "@/types";
import { CommentTypes } from "@/prisma/find/getComments";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

type CommentLike = CommentTypes["commentsLikes"][number];

export const commentLikesColumn: ColumnDef<CommentLike>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       key={row.original.id}
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "user.profile.imageUrl",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="User Image" />
  //   ),
  //   cell: ({ row }) => <div className="w-[400px]">{row.getValue("title")}</div>,
  // },
  // {
  //   id: "username",
  //   accessorFn: ({ user }) => user.username,
  //   header: ({ column }) => column.toggleVisibility(false),
  //   cell: ({ column }) => column.toggleVisibility(false),
  // },
  {
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({
      row: {
        original: { user },
      },
    }) => <div className="w-[200px]">{user.username}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Liked at" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">
        <ClientFormattedDate date={row.getValue("createdAt")} />
      </div>
    ),
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
