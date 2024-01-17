"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";

import { CommentTypes } from "@/db/queries/getComments";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import Link from "next/link";

type CommentLike = CommentTypes["commentsLikes"][number];

export const commentLikesColumn: ColumnDef<CommentLike>[] = [
  {
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({
      row: {
        original: { user },
      },
    }) => (
      <div className="w-[200px]">
        <Link
          href={`/admin/users/${user.username}`}
          className="capitalize link"
        >
          {user.username}
        </Link>
      </div>
    ),
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
];
