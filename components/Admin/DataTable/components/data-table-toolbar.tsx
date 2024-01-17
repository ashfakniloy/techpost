"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Table } from "@tanstack/react-table";
import { X, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import Modal from "@/components/Modal";
import { deleteReplyAdminProps } from "@/db/mutations/admin/deleteReplyAdmin";
import { deleteCommentAdminProps } from "@/db/mutations/admin/deleteCommentAdmin";
import { deletePostAdminProps } from "@/db/mutations/admin/deletePostAdmin";
import { deleteUserAdminProps } from "@/db/mutations/admin/deleteUserAdmin";
// import { DataTableViewOptions } from "./data-table-view-options";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchBy?: string;
  defaultSort?: string;
  defaultOrder?: "asc" | "desc";
  mannualControl?: boolean;
  disableRowSelect: boolean;
  disableSearch?: boolean;
  // deleteUrl?: string;
  deleteAction?:
    | deleteUserAdminProps
    | deletePostAdminProps
    | deleteCommentAdminProps
    | deleteReplyAdminProps;
  showCheckbox: boolean;
  setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>> | any; //ts warning showing for unknown reason, thats why any added
}

export function DataTableToolbar<TData>({
  table,
  searchBy,
  defaultSort = "Created at",
  defaultOrder = "desc",
  mannualControl,
  disableRowSelect,
  disableSearch,
  // deleteUrl,
  deleteAction,
  showCheckbox,
  setShowCheckbox,
}: DataTableToolbarProps<TData>) {
  // const isFiltered =
  //   table.getPreFilteredRowModel().rows.length >
  //   table.getFilteredRowModel().rows.length;

  const router = useRouter();
  const pathname = usePathname();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // with server action
  const handleDeleteRows = async () => {
    if (!deleteAction) return;

    setIsDeleting(true);

    const deleteId = table
      .getSelectedRowModel()
      .flatRows.map((row) => (row.original as { id: string }).id);

    const toastDeletePost = toast.loading("Loading...");

    const result = await deleteAction({ deleteId });

    console.log("result", result);

    if (result?.success) {
      table.resetRowSelection();
      toast.success(result.success, {
        id: toastDeletePost,
      });
    } else if (result?.error) {
      toast.error(result.error, {
        id: toastDeletePost,
      });
    } else {
      toast.error("Error", {
        id: toastDeletePost,
      });
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const searchParams = useSearchParams();
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const debouncedValue = useDebounce(searchTitle, 500);

  const sortParam = searchParams?.get("sort");
  const search = searchParams?.get("search");

  const sortValues = sortParam?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  useEffect(() => {
    search && setSearchTitle(search);
    !search && setSearchTitle(null);
  }, [search]);

  const newParam = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (debouncedValue) {
      newParam.delete("page");
      newParam.set("search", debouncedValue.toString());
    } else {
      newParam.delete("search");
    }

    router.replace(`${pathname}?${newParam}`, { scroll: false });
  }, [debouncedValue]);

  const handleClearSort = () => {
    newParam.delete("sort");
    newParam.delete("page");
    router.replace(`${pathname}?${newParam}`, { scroll: false });
  };

  if (mannualControl) {
    return (
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between">
        <div className="flex items-center flex-1 space-x-2">
          <Input
            placeholder={`Search ${searchBy}`}
            value={searchTitle || ""}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="h-8 w-full lg:w-[250px] outline-none"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 text-sm font-medium lg:mr-5">
          {!disableRowSelect && (
            <div className="flex items-center gap-2">
              {table.getSelectedRowModel().flatRows.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 border-gray-500 font-normal"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{`Delete ${
                      table.getFilteredSelectedRowModel().rows.length
                    } row(s)`}</span>
                  </Button>

                  <Modal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    isPending={isDeleting}
                    title={`Are you sure you want to delete ${
                      table.getSelectedRowModel().rows.length
                    } items?`}
                    handleAction={handleDeleteRows}
                    color="bg-gray-50"
                    colorDark="dark:bg-custom-gray6"
                  />
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setShowCheckbox(!showCheckbox)}
                className="h-8 px-3 text-xs lg:text-sm border-gray-500 font-normal"
              >
                {!showCheckbox ? "Select rows" : "Cancel row selection"}
              </Button>
            </div>
          )}

          <div className="flex items-center  text-xs lg:text-sm h-4">
            <p>
              Sort By:{" "}
              <span className="capitalize">{sortBy || defaultSort}</span> (
              {orderBy || defaultOrder})
            </p>
            {sortBy && orderBy && (
              <button
                type="button"
                className="p-1 ml-1 rounded-md hover:bg-gray-700 border border-gray-500"
                // onClick={() => pathname && router.replace(pathname)}
                onClick={handleClearSort}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* <DataTableViewOptions table={table} /> */}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-end  space-x-2">
        {!disableSearch && searchBy && (
          <Input
            placeholder={`Find ${searchBy}`}
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="h-8 w-full lg:w-[250px] outline-none"
          />
        )}

        {!disableRowSelect && (
          <div className="flex place-self-end items-center gap-2">
            {table.getSelectedRowModel().flatRows.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                  className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 border-gray-500 font-normal"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{`Delete ${
                    table.getFilteredSelectedRowModel().rows.length
                  } row(s)`}</span>
                </Button>
                <Modal
                  showModal={showDeleteModal}
                  setShowModal={setShowDeleteModal}
                  isPending={isDeleting}
                  title={`Are you sure you want to delete ${
                    table.getSelectedRowModel().rows.length
                  } items?`}
                  handleAction={handleDeleteRows}
                  color="bg-gray-50"
                  colorDark="dark:bg-custom-gray6"
                />
              </>
            )}
            <Button
              variant="outline"
              onClick={() => setShowCheckbox(!showCheckbox)}
              className="h-8 px-3"
            >
              {!showCheckbox ? "Select rows" : "Cancel row selection"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

// // with route handler
// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { Table } from "@tanstack/react-table";
// import { X, Trash2 } from "lucide-react";
// import { toast } from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import useDebounce from "@/hooks/useDebounce";
// import Modal from "@/components/Modal";
// // import { DataTableViewOptions } from "./data-table-view-options";
// // import { DataTableFacetedFilter } from "./data-table-faceted-filter";

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
//   searchBy?: string;
//   defaultSort?: string;
//   defaultOrder?: "asc" | "desc";
//   mannualControl?: boolean;
//   disableRowSelect: boolean;
//   disableSearch?: boolean;
//   deleteUrl?: string;
//   showCheckbox: boolean;
//   setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>> | any; //ts warning showing for unknown reason, thats why any added
// }

// export function DataTableToolbar<TData>({
//   table,
//   searchBy,
//   defaultSort = "Created at",
//   defaultOrder = "desc",
//   mannualControl,
//   disableRowSelect,
//   disableSearch,
//   deleteUrl,
//   showCheckbox,
//   setShowCheckbox,
// }: DataTableToolbarProps<TData>) {
//   // const isFiltered =
//   //   table.getPreFilteredRowModel().rows.length >
//   //   table.getFilteredRowModel().rows.length;

//   const router = useRouter();
//   const pathname = usePathname();

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDeleteRows = async () => {
//     if (!deleteUrl) return;

//     setIsDeleting(true);

//     const deleteId = table
//       .getSelectedRowModel()
//       .flatRows.map((row) => (row.original as { id: string }).id);

//     const toastDeletePost = toast.loading("Loading...");

//     const response = await fetch(deleteUrl, {
//       // method: "POST",
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ deleteId }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log("success", data);
//       table.resetRowSelection();
//       toast.success(data.message, {
//         id: toastDeletePost,
//       });
//       router.refresh();
//     } else {
//       toast.error(data.error, {
//         id: toastDeletePost,
//       });
//       console.log("error", data);
//     }

//     setShowDeleteModal(false);
//     setIsDeleting(false);
//   };

//   const searchParams = useSearchParams();
//   const [searchTitle, setSearchTitle] = useState<string | null>(null);
//   const debouncedValue = useDebounce(searchTitle, 500);

//   const sortParam = searchParams?.get("sort");
//   const search = searchParams?.get("search");

//   const sortValues = sortParam?.split(".");
//   const sortBy = sortValues?.[0];
//   const orderBy = sortValues?.[1];

//   useEffect(() => {
//     search && setSearchTitle(search);
//     !search && setSearchTitle(null);
//   }, [search]);

//   const newParam = new URLSearchParams(searchParams.toString());

//   useEffect(() => {
//     if (debouncedValue) {
//       newParam.delete("page");
//       newParam.set("search", debouncedValue.toString());
//     } else {
//       newParam.delete("search");
//     }

//     router.replace(`${pathname}?${newParam}`, { scroll: false });
//   }, [debouncedValue]);

//   const handleClearSort = () => {
//     newParam.delete("sort");
//     newParam.delete("page");
//     router.replace(`${pathname}?${newParam}`, { scroll: false });
//   };

//   if (mannualControl) {
//     return (
//       <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between">
//         <div className="flex items-center flex-1 space-x-2">
//           <Input
//             placeholder={`Search ${searchBy}`}
//             value={searchTitle || ""}
//             onChange={(e) => setSearchTitle(e.target.value)}
//             className="h-8 w-full lg:w-[250px] outline-none"
//           />
//         </div>

//         <div className="flex flex-col lg:flex-row items-center gap-3 text-sm font-medium lg:mr-5">
//           {!disableRowSelect && (
//             <div className="flex items-center gap-2">
//               {table.getSelectedRowModel().flatRows.length > 0 && (
//                 <>
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowDeleteModal(true)}
//                     className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 border-gray-500 font-normal"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span>{`Delete ${
//                       table.getFilteredSelectedRowModel().rows.length
//                     } row(s)`}</span>
//                   </Button>

//                   <Modal
//                     showModal={showDeleteModal}
//                     setShowModal={setShowDeleteModal}
//                     isPending={isDeleting}
//                     title={`Are you sure you want to delete ${
//                       table.getSelectedRowModel().rows.length
//                     } items?`}
//                     handleAction={handleDeleteRows}
//                     color="bg-gray-50"
//                     colorDark="dark:bg-custom-gray6"
//                   />
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 onClick={() => setShowCheckbox(!showCheckbox)}
//                 className="h-8 px-3 text-xs lg:text-sm border-gray-500 font-normal"
//               >
//                 {!showCheckbox ? "Select rows" : "Cancel row selection"}
//               </Button>
//             </div>
//           )}

//           <div className="flex items-center  text-xs lg:text-sm h-4">
//             <p>
//               Sort By:{" "}
//               <span className="capitalize">{sortBy || defaultSort}</span> (
//               {orderBy || defaultOrder})
//             </p>
//             {sortBy && orderBy && (
//               <button
//                 type="button"
//                 className="p-1 ml-1 rounded-md hover:bg-gray-700 border border-gray-500"
//                 // onClick={() => pathname && router.replace(pathname)}
//                 onClick={handleClearSort}
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* <DataTableViewOptions table={table} /> */}
//       </div>
//     );
//   } else {
//     return (
//       <div className="flex items-center justify-end  space-x-2">
//         {!disableSearch && searchBy && (
//           <Input
//             placeholder={`Find ${searchBy}`}
//             value={
//               (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
//             }
//             onChange={(event) =>
//               table.getColumn(searchBy)?.setFilterValue(event.target.value)
//             }
//             className="h-8 w-full lg:w-[250px] outline-none"
//           />
//         )}
//         {/* {!disableRowSelect && (
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowCheckbox(!showCheckbox)}
//                 className="h-8 px-3"
//               >
//                 {!showCheckbox ? "Select rows" : "Cancel row selection"}
//               </Button>
//               {showCheckbox && (
//                 <div className="text-sm text-muted-foreground">
//                   {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                   {table.getFilteredRowModel().rows.length} row(s) selected.
//                 </div>
//               )}
//               {table.getSelectedRowModel().flatRows.length > 0 && (
//                 <>
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowDeleteModal(true)}
//                     className="h-8 px-3"
//                   >
//                     <Trash2 className="w-4 h-4 " />
//                   </Button>
//                   <Modal
//                     showModal={showDeleteModal}
//                     setShowModal={setShowDeleteModal}
//                     isPending={isDeleting}
//                     title={`Are you sure you want to delete ${
//                       table.getSelectedRowModel().rows.length
//                     } items?`}
//                     handleAction={handleDeleteRows}
//                     color="bg-gray-50"
//                     colorDark="dark:bg-custom-gray6"
//                   />
//                 </>
//               )}
//             </div>
//           )} */}
//         {!disableRowSelect && (
//           <div className="flex place-self-end items-center gap-2">
//             {table.getSelectedRowModel().flatRows.length > 0 && (
//               <>
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowDeleteModal(true)}
//                   className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 border-gray-500 font-normal"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   <span>{`Delete ${
//                     table.getFilteredSelectedRowModel().rows.length
//                   } row(s)`}</span>
//                 </Button>
//                 <Modal
//                   showModal={showDeleteModal}
//                   setShowModal={setShowDeleteModal}
//                   isPending={isDeleting}
//                   title={`Are you sure you want to delete ${
//                     table.getSelectedRowModel().rows.length
//                   } items?`}
//                   handleAction={handleDeleteRows}
//                   color="bg-gray-50"
//                   colorDark="dark:bg-custom-gray6"
//                 />
//               </>
//             )}
//             <Button
//               variant="outline"
//               onClick={() => setShowCheckbox(!showCheckbox)}
//               className="h-8 px-3"
//             >
//               {!showCheckbox ? "Select rows" : "Cancel row selection"}
//             </Button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
