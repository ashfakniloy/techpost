// "use client";

// import { ColumnDef } from "@tanstack/react-table";

// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";

// import { labels, priorities, statuses } from "../../data/data";
// import { Task } from "../../data/schema";
// import { DataTableColumnHeader } from "../data-table-column-header";
// import { DataTableRowActions } from "../data-table-row-actions";

// export const usersColumns: ColumnDef<Task>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-[2px]"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-[2px]"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     header: ({ column }) => (
//       <DataTableColumnHeader mannualSort column={column} title="Task" />
//     ),
//     cell: ({ row }) => <div className="w-[100px]">{row.getValue("id")}</div>,
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "title",
//     header: ({ column }) => (
//       <DataTableColumnHeader mannualSort column={column} title="Title" />
//     ),
//     cell: ({ row }) => {
//       const label = labels.find((label) => label.value === row.original.label);

//       return (
//         <div className="flex space-x-2">
//           {label && <Badge variant="outline">{label.label}</Badge>}
//           <span className="max-w-[500px] truncate font-medium">
//             {row.getValue("title")}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <DataTableColumnHeader mannualSort column={column} title="Status" />
//     ),
//     cell: ({ row }) => {
//       const status = statuses.find(
//         (status) => status.value === row.getValue("status")
//       );

//       if (!status) {
//         return null;
//       }

//       return (
//         <div className="flex w-[100px] items-center">
//           {status.icon && (
//             <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{status.label}</span>
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: ({ column }) => (
//       <DataTableColumnHeader mannualSort column={column} title="Priority" />
//     ),
//     cell: ({ row }) => {
//       const priority = priorities.find(
//         (priority) => priority.value === row.getValue("priority")
//       );

//       if (!priority) {
//         return null;
//       }

//       return (
//         <div className="flex items-center">
//           {priority.icon && (
//             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//           )}
//           <span>{priority.label}</span>
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <DataTableRowActions row={row} />,
//   },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Post } from "../../data/schema";
import { DataTableColumnHeader } from "../data-table-column-header";
import { format } from "date-fns";
import { PostsActions } from "../actions/PostsActions";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { PostAdminTypes } from "@/db/queries/admin/getAllPostsAdmin";

export const postsColumns: ColumnDef<PostAdminTypes>[] = [
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
    accessorKey: "user.username",
    header: ({ column }) => (
      <DataTableColumnHeader mannualSort column={column} title="Username" />
    ),
    cell: ({
      row: {
        original: {
          user: { username },
        },
      },
    }) => <div className="w-[150px]">{username}</div>,
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
      // <div className="w-[100px]">
      //   {format(new Date(row.getValue("createdAt")), "MMMM dd yyyy")}
      // </div>
      <div className="w-[180px]">
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
        <PostsActions row={row} />
      </div>
    ),
  },
];
