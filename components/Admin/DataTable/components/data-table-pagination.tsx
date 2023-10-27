import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  count?: number;
  mannualControl?: boolean;
}

export function DataTablePagination<TData>({
  table,
  count = 0,
  mannualControl,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    table.resetRowSelection();
  }, [searchParams]);

  if (mannualControl) {
    // if (!count) {
    //   throw new Error(
    //     "Count is required for server side pagination pagination"
    //   );
    // }

    const limitParam = searchParams?.get("limit");
    const pageParam = searchParams?.get("page");

    const limitNumber = Number(limitParam) || 10;
    const pageNumber = Number(pageParam);

    const numberOfPages =
      count && count > 1 ? Math.ceil(count / limitNumber) : 1;

    const newParam = new URLSearchParams(searchParams.toString());

    const handleNext = () => {
      if (pageNumber >= numberOfPages) return;

      const nextPage = pageNumber === 0 ? 2 : pageNumber + 1;

      newParam.set("page", nextPage.toString());
      router.push(`${pathname}?${newParam}`);
    };

    const handleLast = () => {
      newParam.set("page", numberOfPages.toString());
      router.push(`${pathname}?${newParam}`);
    };

    const handlePrev = () => {
      if (pageNumber <= 1) return;

      const prevPage = pageNumber - 1;

      newParam.set("page", prevPage.toString());
      router.push(`${pathname}?${newParam}`);
    };

    const handleFirst = () => {
      newParam.set("page", "1");
      router.push(`${pathname}?${newParam}`);
    };

    const handleRowsChange = (value: string) => {
      newParam.set("limit", value.toString());
      router.push(`${pathname}?${newParam}`, { scroll: false });
    };

    return (
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0 px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={limitNumber.toString()}
              onValueChange={(value) => {
                handleRowsChange(value);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {pageNumber || 1} of {numberOfPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleFirst}
              disabled={pageNumber <= 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePrev}
              disabled={pageNumber <= 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNext}
              disabled={pageNumber === numberOfPages || limitNumber >= count}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={handleLast}
              disabled={pageNumber === numberOfPages || limitNumber >= count}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between px-2">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
