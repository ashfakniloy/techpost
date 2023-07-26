"use client";

import { Table } from "@tanstack/react-table";
import { X, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

// import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFullPath from "@/hooks/useFullPath";
import useDebounce from "@/hooks/useDebounce";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";
import { Post } from "../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchBy: string;
  defaultSort?: string;
  defaultOrder?: "asc" | "desc";
  mannualControl?: boolean;
  disableRowSelect: boolean;
  disableSearch?: boolean;
  deleteUrl?: string;
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
  deleteUrl,
  showCheckbox,
  setShowCheckbox,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  const router = useRouter();
  const pathname = usePathname();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteRows = async () => {
    if (!deleteUrl) return;

    setIsDeleting(true);

    const deleteId = table
      .getSelectedRowModel()
      .flatRows.map((row) => (row.original as { id: string }).id);

    const toastDeletePost = toast.loading("Loading...");

    const response = await fetch(deleteUrl, {
      // method: "POST",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteId }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("success", data);
      table.resetRowSelection();
      toast.success(data.message, {
        id: toastDeletePost,
      });
      router.refresh();
    } else {
      toast.error("Something went wrong", {
        id: toastDeletePost,
      });
      console.log("error", data);
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const searchParams = useSearchParams();
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const debouncedValue = useDebounce(searchTitle, 500);

  const hasSort = searchParams.has("sort");
  const sortParam = searchParams.get("sort");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  const limitNumber = Number(limit) || 10;

  const sortValues = sortParam?.split("%20").join("").split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  useEffect(() => {
    setSearchTitle(search);
    !search && setSearchTitle(null);
  }, [search]);

  useEffect(() => {
    const path = hasSort
      ? `${pathname}?sort=${sortParam}&&search=${debouncedValue}&limit=${limitNumber}`
      : debouncedValue
      ? `${pathname}?search=${debouncedValue}&limit=${limitNumber}`
      : pathname;

    debouncedValue && router.push(path, { scroll: false });
    debouncedValue === "" && router.push(pathname, { scroll: false });
  }, [debouncedValue]);

  if (mannualControl) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 space-x-2">
          <Input
            placeholder={`Search ${searchBy}`}
            value={searchTitle || ""}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px] outline-none "
          />
        </div>

        <div className="flex items-center gap-3 text-sm font-medium mr-5">
          {!disableRowSelect && (
            <div className="flex items-center gap-2">
              {table.getSelectedRowModel().flatRows.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="h-8 px-3 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4 " />
                    <span className="">{`Delete ${
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

          <p className="">
            Sort By: <span className="capitalize">{sortBy || defaultSort}</span>{" "}
            ({orderBy || defaultOrder})
          </p>
          {sortBy && orderBy && (
            <button
              type="button"
              className="p-1 ml-1 rounded-md hover:bg-gray-700"
              onClick={() => router.replace(pathname)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-end  space-x-2">
        {!disableSearch && (
          <Input
            placeholder={`Find ${searchBy}`}
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] outline-none focus:border-gray-500"
          />
        )}
        {/* {!disableRowSelect && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCheckbox(!showCheckbox)}
                className="h-8 px-3"
              >
                {!showCheckbox ? "Select rows" : "Cancel row selection"}
              </Button>
              {showCheckbox && (
                <div className="text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
              )}
              {table.getSelectedRowModel().flatRows.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="h-8 px-3"
                  >
                    <Trash2 className="w-4 h-4 " />
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
            </div>
          )} */}
        {!disableRowSelect && (
          <div className="flex place-self-end items-center gap-2">
            {table.getSelectedRowModel().flatRows.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                  className="h-8 px-3 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 " />
                  <span className="">{`Delete ${
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
