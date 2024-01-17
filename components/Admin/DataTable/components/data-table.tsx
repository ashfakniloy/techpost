"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { deleteReplyAdminProps } from "@/db/mutations/admin/deleteReplyAdmin";
import { deleteCommentAdminProps } from "@/db/mutations/admin/deleteCommentAdmin";
import { deletePostAdminProps } from "@/db/mutations/admin/deletePostAdmin";
import { deleteUserAdminProps } from "@/db/mutations/admin/deleteUserAdmin";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchBy?: string;
  count?: number;
  deleteAction?:
    | deleteUserAdminProps
    | deletePostAdminProps
    | deleteCommentAdminProps
    | deleteReplyAdminProps;

  disableRowSelect?: boolean;
  disableSearch?: boolean;
  disablePagination?: boolean;
  mannualControl?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchBy,
  count,
  deleteAction,
  disableRowSelect = false,
  disableSearch,
  disablePagination,
  mannualControl,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [showCheckbox, setShowCheckbox] = useState(false);

  const columnsFiltered =
    !disableRowSelect && showCheckbox
      ? columns
      : columns.filter((column) => column.id !== "select");

  const table = useReactTable({
    data,
    columns: columnsFiltered,
    // initialState: {
    //   pagination: {
    //     pageIndex: 1,
    //     pageSize: 20,
    //   },
    // },
    manualPagination: mannualControl ? true : false,
    manualSorting: mannualControl ? true : false,
    manualFiltering: mannualControl ? true : false,
    // pageCount: count,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: showCheckbox ? true : false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    !showCheckbox && table.resetRowSelection();
  }, [showCheckbox]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchBy={searchBy}
        deleteAction={deleteAction}
        showCheckbox={showCheckbox}
        setShowCheckbox={setShowCheckbox}
        mannualControl={mannualControl}
        disableRowSelect={disableRowSelect}
        disableSearch={disableSearch}
      />
      <div className="border-y border-gray-300 dark:border-slate-700 overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-gray-300 dark:border-slate-700"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-300 dark:border-slate-700 relative"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      // key={cell.row.original.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!disablePagination && (
        <DataTablePagination
          table={table}
          count={count}
          mannualControl={mannualControl}
        />
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   Table as TableType,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { DataTablePagination } from "../components/data-table-pagination";
// import { DataTableToolbar } from "../components/data-table-toolbar";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   searchBy?: string;
//   count?: number;
//   deleteUrl?: string;
//   disableRowSelect?: boolean;
//   disableSearch?: boolean;
//   disablePagination?: boolean;
//   mannualControl?: boolean;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   searchBy,
//   count,
//   deleteUrl,
//   disableRowSelect = false,
//   disableSearch,
//   disablePagination,
//   mannualControl,
// }: DataTableProps<TData, TValue>) {
//   const [rowSelection, setRowSelection] = useState({});
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [sorting, setSorting] = useState<SortingState>([]);

//   const [showCheckbox, setShowCheckbox] = useState(false);

//   const columnsFiltered =
//     !disableRowSelect && showCheckbox
//       ? columns
//       : columns.filter((column) => column.id !== "select");

//   const table = useReactTable({
//     data,
//     columns: columnsFiltered,
//     // initialState: {
//     //   pagination: {
//     //     pageIndex: 1,
//     //     pageSize: 20,
//     //   },
//     // },
//     manualPagination: mannualControl ? true : false,
//     manualSorting: mannualControl ? true : false,
//     manualFiltering: mannualControl ? true : false,
//     // pageCount: count,
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//     },
//     enableRowSelection: showCheckbox ? true : false,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   });

//   useEffect(() => {
//     !showCheckbox && table.resetRowSelection();
//   }, [showCheckbox]);

//   return (
//     <div className="space-y-4">
//       <DataTableToolbar
//         table={table}
//         searchBy={searchBy}
//         deleteUrl={deleteUrl}
//         showCheckbox={showCheckbox}
//         setShowCheckbox={setShowCheckbox}
//         mannualControl={mannualControl}
//         disableRowSelect={disableRowSelect}
//         disableSearch={disableSearch}
//       />
//       <div className="border-y border-gray-300 dark:border-slate-700 overflow-x-auto">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow
//                 key={headerGroup.id}
//                 className="border-gray-300 dark:border-slate-700"
//               >
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   // key={row.original.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className="border-gray-300 dark:border-slate-700 relative"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell
//                       key={cell.id}
//                       // key={cell.row.original.id}
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {!disablePagination && (
//         <DataTablePagination
//           table={table}
//           count={count}
//           mannualControl={mannualControl}
//         />
//       )}
//     </div>
//   );
// }
