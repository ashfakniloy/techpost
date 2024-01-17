"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "../data-table-column-header";
import type { CommentTypes } from "@/db/queries/getComments";
import { RepliesAction } from "../actions/repliesAction";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

type CommentReply = CommentTypes["commentsReplies"][number];

export const repliesColumn: ColumnDef<CommentReply>[] = [
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
        className="translate-y-[2px] absolute top-5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "replies",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Replies" />
    ),
    cell: ({ row: { original } }) => {
      const { id, user, commentReply } = original;

      // console.log(row.original);

      return (
        <div className="w-[400px]">
          <div key={id}>
            <div className="flex gap-3 ">
              <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                {user?.profile?.imageUrl ? (
                  <Image
                    src={user.profile.imageUrl}
                    alt={user.username}
                    fill
                    sizes="35px"
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex-1 w-[10%]">
                <p className="text-sm font-semibold">
                  <Link
                    href={`/admin/users/${user.username}`}
                    className="capitalize link"
                  >
                    {user.username}
                  </Link>
                </p>
                <div>
                  <p>{commentReply}</p>
                </div>
                <div className="relative">
                  <div className="relative flex w-full justify-between items-center text-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        <ClientFormattedDate date={row.getValue("createdAt")} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="w-[10px]">
        <RepliesAction row={row} />
      </div>
    ),
  },
];
