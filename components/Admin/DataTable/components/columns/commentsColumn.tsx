"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { getFormatedDate } from "@/utils/getFormatedDate";
import { CommentsAction } from "../actions/commentsAction";
import { DataTableColumnHeader } from "../data-table-column-header";
import type { CommentTypes } from "@/prisma/find/getComments";
import { getPluralize } from "@/utils/getPluralize";
import { usePathname } from "next/navigation";

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

  // console.log(row.original);

  return (
    <div key={id} className="">
      <div className="flex gap-3 break-words">
        <div className="">
          {user?.profile?.imageUrl ? (
            <Image
              src={user.profile.imageUrl}
              alt={user.username}
              width={35}
              height={35}
              className="rounded-full"
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
              href={`/user/${user.username}`}
              className="hover:text-blue-800 dark:hover:text-blue-500"
            >
              {user.username}
            </Link>
          </p>
          <div className="">
            <p className="overflow-hidden break-words">{comment}</p>
          </div>
          <div className="mt-2 flex items-center gap-8">
            {_count.commentsLikes > 0 && (
              <Link
                href={`${pathname}?showLikes=${id}`}
                scroll={false}
                replace={true}
                className="bg-blue-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
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
                className="bg-gray-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
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
  // {
  //   id: "username",
  //   accessorFn: ({ user }) => user.username,
  //   header: ({ column }) => column.toggleVisibility(false),
  //   cell: ({ column }) => column.toggleVisibility(false),
  // },
  {
    id: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
    cell: ({ row: { original } }) => {
      const { id, comment, user, userId, commentsLikes, _count } = original;

      // console.log(row.original);

      return (
        <div className="w-[400px]">
          <CommentsCell id={id} comment={comment} user={user} _count={_count} />

          {/* <div key={id} className="">
            <div className="flex gap-3 break-words">
              <div className="">
                {user?.profile?.imageUrl ? (
                  <Image
                    src={user.profile.imageUrl}
                    alt={user.username}
                    width={35}
                    height={35}
                    className="rounded-full"
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
                    href={`/user/${user.username}`}
                    className="hover:text-blue-800 dark:hover:text-blue-500"
                  >
                    {user.username}
                  </Link>
                </p>
                <div className="">
                  <p className="overflow-hidden break-words">{comment}</p>
                </div>
                <div className="mt-2 flex items-center gap-8">
                  {_count.commentsLikes > 0 && (
                    <Link
                      href={`${pathname}?showLikes=${id}`}
                      scroll={false}
                      replace={true}
                      className="bg-blue-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
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
                      className="bg-gray-700 px-2.5 py-1 rounded-full text-xs font-medium hover:underline"
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
                  <div className="relative flex w-full justify-between items-center text-sm">
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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
        {getFormatedDate(row.getValue("createdAt"))}
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
