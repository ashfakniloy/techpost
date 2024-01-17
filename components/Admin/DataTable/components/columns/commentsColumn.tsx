"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

import { CommentsAction } from "../actions/commentsAction";
import { DataTableColumnHeader } from "../data-table-column-header";
import type { CommentTypes } from "@/db/queries/getComments";
import { getPluralize } from "@/utils/getPluralize";
import { usePathname } from "next/navigation";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

type User = {
  id: string;
  username: string;
  profile: {
    imageUrl: string | null;
  } | null;
};

type Count = {
  commentsLikes: number;
  commentsReplies: number;
};

const CommentsCell = ({
  id,
  comment,
  user,
  _count,
}: {
  id: string;
  comment: string;
  user: User;
  _count: Count;
}) => {
  const pathname = usePathname();

  return (
    <div key={id}>
      <div className="flex gap-3 break-words">
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
            <p className="overflow-hidden break-words">{comment}</p>
          </div>
          <div className="mt-2 flex items-center gap-8">
            {_count.commentsLikes > 0 && (
              <Link
                href={`${pathname}?showLikes=${id}`}
                scroll={false}
                replace={true}
                className="bg-blue-300 dark:bg-blue-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
              >
                {getPluralize({
                  count: _count.commentsLikes,
                  name: "like",
                  plural: "likes",
                })}
              </Link>
            )}
            {_count.commentsReplies > 0 && (
              <Link
                href={`${pathname}?showReplies=${id}`}
                scroll={false}
                replace={true}
                className="bg-gray-300 dark:bg-gray-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
              >
                {getPluralize({
                  count: _count.commentsReplies,
                  name: "reply",
                  plural: "replies",
                })}
              </Link>
            )}
          </div>
          <div className="relative">
            <div className="relative flex w-full justify-between items-center text-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const commentsColumn: ColumnDef<CommentTypes>[] = [
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
    id: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
    cell: ({ row: { original } }) => {
      const { id, comment, user, _count } = original;

      // console.log(row.original);

      return (
        <div className="w-[400px]">
          <CommentsCell id={id} comment={comment} user={user} _count={_count} />
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
        <CommentsAction row={row} />
      </div>
    ),
  },
];
