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

    const hasSort = searchParams.has("sort");
    const hasSearch = searchParams.has("search");

    const sortParam = searchParams.get("sort");
    const searchParam = searchParams.get("search");
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const limitNumber = Number(limitParam) || 10;
    const pageNumber = Number(pageParam);

    const numberOfPages =
      count && count > 1 ? Math.ceil(count / limitNumber) : 1;

    const handleNext = () => {
      if (pageNumber >= numberOfPages) return;

      const nextPage = pageNumber === 0 ? 2 : pageNumber + 1;

      // const path = hasSort
      //   ? `${pathname}?sort=${searchParams.get(
      //       "sort"
      //     )}&page=${nextPage}&limit=${limit}`
      //   : `${pathname}?page=${nextPage}&limit=${limit}`;

      const path =
        hasSort && hasSearch
          ? `${pathname}?search=${searchParam}&sort=${sortParam}&page=${nextPage}&limit=${limitNumber}`
          : hasSort
          ? `${pathname}?sort=${sortParam}&page=${nextPage}&limit=${limitNumber}`
          : hasSearch
          ? `${pathname}?search=${searchParam}&page=${nextPage}&limit=${limitNumber}`
          : `${pathname}?page=${nextPage}&limit=${limitNumber}`;

      router.push(path);

      // router.push(`${pathname}?page=${nextPage}&limit=${limitNumber}`);

      // const path = route
      //   ? `/${route}?page=${nextPage}&limit=${limitNumber}`
      //   : `/${pathname}?page=${nextPage}&limit=${limitNumber}`;

      // router.push(path);
    };

    const handleLast = () => {
      // if (pageNumber >= numberOfPages) return;

      // const nextPage = pageNumber === 0 ? 2 : pageNumber + 1;

      const path =
        hasSort && hasSearch
          ? `${pathname}?sort=${sortParam}&search=${searchParam}&page=${numberOfPages}&limit=${limitNumber}`
          : hasSort
          ? `${pathname}?sort=${sortParam}&page=${numberOfPages}&limit=${limitNumber}`
          : hasSearch
          ? `${pathname}?search=${searchParam}&page=${numberOfPages}&limit=${limitNumber}`
          : `${pathname}?page=${numberOfPages}&limit=${limitNumber}`;

      router.push(path);

      // router.push(`${pathname}?page=${numberOfPages}&limit=${limitNumber}`);

      // const path = route
      //   ? `/${route}?page=${numberOfPages}&limit=${limitNumber}`
      //   : `/${pathname}?page=${numberOfPages}&limit=${limitNumber}`;

      // router.push(path);
    };

    const handlePrev = () => {
      if (pageNumber <= 1) return;

      const prevPage = pageNumber - 1;

      // const path = hasSort
      //   ? `${pathname}?sort=${searchParams.get(
      //       "sort"
      //     )}&page=${prevPage}&limit=${limitNumber}`
      //   : `${pathname}?page=${prevPage}&limit=${limitNumber}`;

      const path =
        hasSort && hasSearch
          ? `${pathname}?sort=${sortParam}&search=${searchParam}&page=${prevPage}&limit=${limitNumber}`
          : hasSort
          ? `${pathname}?sort=${sortParam}&page=${prevPage}&limit=${limitNumber}`
          : hasSearch
          ? `${pathname}?search=${searchParam}&page=${prevPage}&limit=${limitNumber}`
          : `${pathname}?page=${prevPage}&limit=${limitNumber}`;

      router.push(path);

      // router.push(`${pathname}?page=${prevPage}&limit=${limitNumber}`);

      // const path = route
      //   ? `/${route}?page=${prevPage}&limit=${limitNumber}`
      //   : `/${pathname}?page=${prevPage}&limit=${limitNumber}`;

      // router.push(path);

      // prevPage === 1
      //   ? router.push(`/${pathname}`)
      //   : router.push(`/${pathname}?page=${prevPage}&limit=${limitNumber}`);
    };

    const handleFirst = () => {
      // router.push(`/${pathname}`);

      const path =
        hasSort && hasSearch
          ? `${pathname}?sort=${sortParam}&search=${searchParam}&page=1&limit=${limitNumber}`
          : hasSort
          ? `${pathname}?sort=${sortParam}&page=1&limit=${limitNumber}`
          : hasSearch
          ? `${pathname}?search=${searchParam}&page=1&limit=${limitNumber}`
          : `${pathname}?page=1&limit=${limitNumber}`;

      router.push(path);

      // router.push(`${pathname}?page=1&limit=${limitNumber}`);

      // const path = route
      //   ? `/${route}?page=1&limit=${limitNumber}`
      //   : `/${pathname}?page=1&limit=${limitNumber}`;

      // router.push(path);
    };

    const handleRowsChange = (value: string) => {
      const path =
        hasSort && hasSearch
          ? `${pathname}?sort=${sortParam}&search=${searchParam}&limit=${value}`
          : hasSort
          ? `${pathname}?sort=${searchParams.get("sort")}&limit=${value}`
          : hasSearch
          ? `${pathname}?search=${searchParam}&limit=${value}`
          : `${pathname}?limit=${value}`;

      router.push(path, { scroll: false });

      // router.push(`${pathname}?limit=${value}`, { scroll: false });
    };

    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
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
        <div className="flex items-center justify-between w-full">
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
