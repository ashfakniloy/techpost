"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortBy() {
  const options = ["Recent", "Popular"];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasSort = searchParams?.has("sort");
  const sort = searchParams?.get("sort");

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    router.push(`${pathname}?sort=${value.toLowerCase()}`);
  };

  useEffect(() => {
    !hasSort && setSelectedOption(options[0]);
    sort === "recent" && setSelectedOption("Recent");
    sort === "popular" && setSelectedOption("Popular");
  }, [searchParams]);

  return (
    <div className="flex items-center gap-1 text-xs lg:gap-2 lg:text-sm">
      <p>Sort By:</p>

      <Select value={selectedOption} onValueChange={handleOptionClick}>
        <SelectTrigger
          aria-label="sort by"
          className="px-2 lg:px-3 w-[110px] text-left shadow-md bg-gray-50 dark:bg-stone-800 rounded-md border border-transparent cursor-pointer focus:outline-none"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[110px]">
          {options.map((option) => (
            <SelectItem key={option} aria-label={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortBy;
