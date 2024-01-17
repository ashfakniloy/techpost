"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Post } from "@prisma/client";
import { Loader } from "@/components/Loaders/Loader";
import useDebounce from "@/hooks/useDebounce";
import SearchResult from "./SearchResult";

type Props = Post & {
  user: {
    username: string;
  };
};

function SearchButton() {
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
    <div className="relative">
      <div
        className={`relative overflow-hidden h-[42px] flex items-center rounded-full bg-gray-50 dark:bg-custom-gray2 shadow-md transition-[width] duration-300 ease-out  ${
          showSearchbar ? "w-[380px]" : "w-[42px]"
        }`}
      >
        <button
          type="button"
          aria-label="search"
          className="absolute inset-y-0 right-0 h-[42px] w-[42px] flex justify-center items-center rounded-full bg-gray-50 dark:bg-custom-gray2 hover:border hover:border-gray-300 dark:hover:border-zinc-600 hover:transition-colors hover:duration-300"
          onClick={() => {
            setShowSearchbar(!showSearchbar);
            setTitle("");
          }}
        >
          <span
            className={`bg-gray-200 dark:bg-custom-gray3 rounded-full transition-transform duration-300 ${
              showSearchbar && "-rotate-90"
            }`}
          >
            {!showSearchbar ? (
              <Search className="p-1 h-7 w-7 " />
            ) : (
              <X className="p-1 h-7 w-7 " />
            )}
          </span>
        </button>

        {showSearchbar && (
          <div className="flex items-center w-full">
            <label
              htmlFor="search"
              aria-label="search"
              className="flex w-[35px] ml-2"
            >
              {!loading ? (
                <span className="bg-gray-200 dark:bg-custom-gray3 rounded-full opacity-60">
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
              className={`px-1.5  bg-gray-50 dark:bg-custom-gray2  text-gray-900 dark:text-gray-50  outline-none w-full `}
            />
          </div>
        )}
      </div>
      {showSearchbar && searchResult && (
        <SearchResult
          heading={`Search results for "${debouncedValue}"`}
          posts={searchResult}
        />
      )}
    </div>
  );
}

export default SearchButton;
