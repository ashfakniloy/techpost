"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Post } from "@prisma/client";
import useDebounce from "@/hooks/useDebounce";
import { Loader } from "@/components/Loaders/Loader";
import SearchResult from "./SearchResult";

type Props = Post & {
  user: {
    username: string;
  };
};

function SearchButtonMobile() {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [title, setTitle] = useState("");

  const debouncedValue = useDebounce(title, 500);

  const [searchResult, setSearchResult] = useState<null | Props[]>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams?.get("page");

  useEffect(() => {
    setShowSearchbar(false);
  }, [pathname, params]);

  useEffect(() => {
    setShowSearchbar(false);
  }, [pathname]);

  useEffect(() => {
    title.trim().length > 0 ? setLoading(true) : setLoading(false);
    setSearchResult(null);
  }, [title]);

  useEffect(() => {
    const getSearch = async () => {
      setSearchResult(null);

      const res = await fetch(`/api/search?title=${debouncedValue}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        setSearchResult(data);
        setLoading(false);
        // console.log("data", data);
      } else {
        console.log(data);
        setLoading(false);
      }
    };

    debouncedValue && debouncedValue.trim().length > 0 && getSearch();

    // setLoading(false);
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <button
        type="button"
        aria-label="search"
        className="h-[42px] w-[42px] flex justify-center items-center rounded-full bg-gray-50 dark:bg-custom-gray2 active:border active:border-gray-300 dark:active:border-zinc-600 active:transition-colors active:duration-300"
        onClick={() => {
          setShowSearchbar(!showSearchbar);
          setTitle("");
        }}
      >
        <span className="bg-gray-200 dark:bg-custom-gray3 rounded-full">
          {!showSearchbar ? (
            <Search className="p-1 h-7 w-7" />
          ) : (
            <X className="p-1 h-7 w-7" />
          )}
        </span>
      </button>

      {showSearchbar && (
        <div className="absolute mt-4 inset-x-2">
          <div className="relative flex justify-center items-center w-full text-gray-900 bg-gray-50 rounded-full shadow-md dark:bg-custom-gray2 dark:text-gray-50">
            <label
              htmlFor="search"
              aria-label="search"
              className="flex w-[35px] ml-3"
            >
              {!loading ? (
                <span className=" bg-gray-200 dark:bg-custom-gray3 rounded-full opacity-60 text-gray-400">
                  <Search className="p-1 h-7 w-7" />
                </span>
              ) : (
                <span className="">
                  <Loader width="23" />
                </span>
              )}
            </label>
            <input
              autoFocus={showSearchbar && true}
              type="text"
              placeholder="Seach post title"
              name="search"
              autoComplete="off"
              value={title}
              onChange={handleChange}
              className={`pl-1.5 pr-4 py-3 outline-none w-full text-gray-900 bg-gray-50 rounded-full dark:bg-custom-gray2 dark:text-gray-50`}
            />

            {showSearchbar && searchResult && (
              <SearchResult
                heading={`Search results for "${debouncedValue}"`}
                posts={searchResult}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchButtonMobile;
