"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { format } from "date-fns";
import { UsersActions } from "../actions/UsersActions";
// import { User } from "../../data/schema";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { User } from "@prisma/client";

type UserProps = User & {
  _count: {
    posts: number;
  };
};

export const usersColumns: ColumnDef<UserProps>[] = [
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
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader mannualSort column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("username")}</div>
    ),
    // enableSorting: true,
    // enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("email")}</div>,
    // enableSorting: true,
    // enableHiding: true,
  },
  {
    accessorKey: "_count.posts",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Posts" />
    ),
    // cell: ({ row }) => (
    //   <div className="w-[80px]">{row.getValue("_count.Post")}</div>
    // ),
    cell: ({
      row: {
        original: {
          _count: { posts },
        },
      },
    }) => <div className="w-[80px]">{posts}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Created at" />
    ),
    cell: ({ row }) => (
      <div className="w-[170px]">
        {/* {getFormatedDate(row.getValue("createdAt"))} */}
        {/* {format(new Date(row.getValue("createdAt")), "MMMM dd yyyy")} */}
        <ClientFormattedDate date={row.getValue("createdAt")} />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="w-[0px]">
        <UsersActions row={row} />
        {/* <DataTableRowActions
          row={row}
          id={row.original.id}
          title={row.original.username}
          deleteUrl={`/api/user?userId=${row.original.id}`}
        /> */}
      </div>
    ),
  },
];
