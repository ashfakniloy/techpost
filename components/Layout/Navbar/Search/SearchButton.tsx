"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "@/components/Loaders/Loader";
import useDebounce from "@/hooks/useDebounce";
import { Post } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
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
  const params = searchParams.get("page");

  useEffect(() => {
    setShowSearchbar(false);
  }, [pathname, params]);

  useEffect(() => {
    title ? setLoading(true) : setLoading(false);
    setSearchResult(null);
  }, [title]);

  useEffect(() => {
    const getSearch = async () => {
      setSearchResult(null);

      const res = await fetch(`/api/post/search?title=${debouncedValue}`, {
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

    debouncedValue && getSearch();

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
          className={`absolute p-1 right-1.5 h-7 w-7 bg-gray-200 dark:bg-custom-gray3 rounded-full transition-transform duration-300 ${
            showSearchbar && "-rotate-90"
          }`}
          onClick={() => {
            setShowSearchbar(!showSearchbar);
            setTitle("");
          }}
        >
          {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
        </button>

        {showSearchbar && (
          <div className="flex items-center flex-1">
            <label className="flex max-w-[34px]">
              {!loading ? (
                <label
                  htmlFor="search"
                  aria-label="search"
                  className="w-6 h-6 mt-1 ml-3 text-gray-400"
                >
                  <MagnifyingGlassIcon />
                </label>
              ) : (
                <span className="ml-3">
                  {/* <Loader width="23" strokeColor="white" /> */}
                  <Loader2 width="23" />
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
              className={`px-3 rounded-full bg-gray-50 dark:bg-custom-gray2  text-gray-900 dark:text-gray-50  outline-none w-full `}
            />
          </div>
        )}
      </div>
      {showSearchbar && searchResult && (
        // <div className="absolute shadow-md top-[59px] w-full border border-slate-300 dark:border-slate-700  overflow-hidden">
        //   <PostsSideSection
        //     heading={`Search results for "${debouncedValue}"`}
        //     posts={searchResult}
        //   />
        // </div>
        <SearchResult
          heading={`Search results for "${debouncedValue}"`}
          posts={searchResult}
        />

        // <div className="bg-custom-gray2 absolute top-[60px] w-full p-3">
        //   <p className="text-lg">Search results for "{debouncedValue}"</p>
        //   {searchResult.length > 0 ? (
        //     <div className="max-h-[265px] overflow-y-auto scrollbar-thin scrollbar-track-gray-600/50 scrollbar-thumb-gray-500/50">
        //       {searchResult.map((result) => (
        //         <Link key={result.id} href={`/post/${result.id}`}>
        //           <p className="p-3 hover:bg-gray-700">
        //             {result.title}
        //           </p>
        //         </Link>
        //       ))}
        //     </div>
        //   ) : (
        //     <p className="p-3 text-center">No results found</p>
        //   )}
        // </div>
      )}
    </div>

    // <div
    //   className={`relative  h-[42px] flex items-center rounded-full bg-gray-400 dark:bg-custom-gray2 shadow-md   transition-[width] duration-300 ease-out  ${
    //     showSearchbar ? "w-[380px]" : "w-[42px]"
    //   }`}
    // >
    //   <button
    //     type="button"
    //     className="absolute right-0 bg-gray-600 dark:bg-custom-gray3 inset-y-0 flex justify-center items-center rounded-full overflow-hidden p-1.5 m-1"
    //     onClick={() => setShowSearchbar(!showSearchbar)}
    //   >
    //     <span
    //       className={`h-6 w-6 rounded-full transition-transform duration-300 ${
    //         showSearchbar && "-rotate-90"
    //       }`}
    //     >
    //       {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
    //     </span>
    //   </button>

    //   {showSearchbar && (
    //     <div className="flex items-center">
    //       {/* <label
    //   htmlFor="search"
    //   aria-label="search"
    //   className="w-6 h-6 mt-1 ml-3 text-gray-400"
    // >
    //   <MagnifyingGlassIcon />
    // </label> */}
    //       <span className="ml-3">
    //         <Loader width="25" />
    //       </span>
    //       <input
    //         autoFocus={showSearchbar && true}
    //         type="text"
    //         placeholder="Seach post title"
    //         className={`px-3 rounded-full bg-gray-50 dark:bg-custom-gray2  text-gray-900 dark:text-gray-50  outline-none w-full `}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default SearchButton;
