import { Column } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  EyeOff,
  ListRestart,
  SortAsc,
  SortDesc,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  mannualSort?: boolean;
  defaultSort?: string;
  defaultOrder?: "asc" | "desc";
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  mannualSort,
  defaultSort = "Created at",
  defaultOrder = "desc",
}: DataTableColumnHeaderProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (mannualSort) {
    const hasSearch = searchParams.has("search");
    const searchParam = searchParams.get("search");

    const sortParam = searchParams.get("sort");
    const limitParam = searchParams.get("limit");

    const limitNumber = Number(limitParam) || 10;

    const sortValues = sortParam?.split(".");
    const sortBy = sortValues?.[0];
    const orderBy = sortValues?.[1];

    const paramTitle = sortBy?.split("%20").join(" ");

    // if (!column.getCanSort()) {
    //   return <div className={cn(className)}>{title}</div>;
    // }

    const handleSort = (sortValue: string) => {
      const path = hasSearch
        ? `${pathname}?search=${searchParam}&sort=${title.toLowerCase()}.${sortValue}&limit=${limitNumber}`
        : `${pathname}?sort=${title.toLowerCase()}.${sortValue}&limit=${limitNumber}`;

      router.replace(path, { scroll: false });
    };

    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>

              {paramTitle ? (
                paramTitle === title.toLowerCase() ? (
                  orderBy === "desc" ? (
                    <SortDesc className="ml-2 h-4 w-4" />
                  ) : orderBy === "asc" ? (
                    <SortAsc className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
                )
              ) : title === defaultSort ? (
                defaultOrder === "desc" ? (
                  <SortDesc className="ml-2 h-4 w-4" />
                ) : defaultOrder === "asc" ? (
                  <SortAsc className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
                )
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleSort("asc")}>
              <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleSort("desc")}>
              <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => column.clearSorting()}>
            <ListRestart className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Default
          </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    if (!column.getCanSort()) {
      return <div className={cn(className)}>{title}</div>;
    }

    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {column.getIsSorted() === "desc" ? (
                <SortDesc className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <SortAsc className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <SortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <SortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <ListRestart className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Default
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
