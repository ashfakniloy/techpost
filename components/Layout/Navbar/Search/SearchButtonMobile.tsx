// "use client";

// import { useEffect, useState } from "react";
// import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Loader2 } from "@/components/Loaders/Loader";
// import useDebounce from "@/hooks/useDebounce";
// import { Post } from "@prisma/client";
// import { usePathname, useSearchParams } from "next/navigation";
// import SearchResult from "./SearchResult";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// type Props = Post & {
//   user: {
//     username: string;
//   };
// };

// function SearchButtonMobile() {
//   const [showSearchbar, setShowSearchbar] = useState(false);
//   const [title, setTitle] = useState("");

//   const debouncedValue = useDebounce(title, 500);

//   const [searchResult, setSearchResult] = useState<null | Props[]>(null);
//   const [loading, setLoading] = useState(false);

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const params = searchParams.get("page");

//   useEffect(() => {
//     setShowSearchbar(false);
//   }, [pathname, params]);

//   useEffect(() => {
//     setShowSearchbar(false);
//   }, [pathname]);

//   useEffect(() => {
//     title ? setLoading(true) : setLoading(false);
//     setSearchResult(null);
//   }, [title]);

//   useEffect(() => {
//     const getSearch = async () => {
//       setSearchResult(null);

//       const res = await fetch(`/api/post/search?title=${debouncedValue}`, {
//         cache: "no-store",
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setSearchResult(data);
//         setLoading(false);
//         // console.log("data", data);
//       } else {
//         console.log(data);
//         setLoading(false);
//       }
//     };

//     debouncedValue && getSearch();

//     // setLoading(false);
//   }, [debouncedValue]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   return (
//     <div className="relative">
//       <Popover modal open={showSearchbar} onOpenChange={setShowSearchbar}>
//         <PopoverTrigger asChild>
//           <div
//             className={`relative overflow-hidden h-[42px] w-[42px] flex items-center justify-center rounded-full bg-gray-50 dark:bg-custom-gray2 shadow-md`}
//           >
//             <button
//               type="button"
//               className={`absolute p-1 h-7 w-7 bg-gray-200 dark:bg-custom-gray3 rounded-full ${
//                 showSearchbar && "-rotate-90"
//               }`}
//               onClick={() => {
//                 setShowSearchbar(!showSearchbar);
//                 setTitle("");
//               }}
//             >
//               {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
//             </button>
//           </div>
//         </PopoverTrigger>
//         <PopoverContent className=" border-none bg-transparent w-full mt-4 inset-x-2">
//           <div className="">
//             <div className="relative flex items-center w-full text-gray-900 bg-gray-50 rounded-full shadow-md dark:bg-custom-gray2 dark:text-gray-50">
//               <label className="flex">
//                 {!loading ? (
//                   <label
//                     htmlFor="search"
//                     aria-label="search"
//                     className="w-6 h-6 mt-1 ml-3 text-gray-400"
//                   >
//                     <MagnifyingGlassIcon />
//                   </label>
//                 ) : (
//                   <span className="ml-3">
//                     {/* <Loader width="23" strokeColor="white" /> */}
//                     <Loader2 width="23" />
//                   </span>
//                 )}
//               </label>
//               <input
//                 autoFocus={showSearchbar && true}
//                 type="text"
//                 placeholder="Seach post title"
//                 name="search"
//                 autoComplete="off"
//                 value={title}
//                 onChange={handleChange}
//                 className={`p-3 outline-none w-full text-gray-900 bg-gray-50 rounded-full dark:bg-custom-gray2 dark:text-gray-50`}
//               />

//               {showSearchbar && searchResult && (
//                 <SearchResult
//                   heading={`Search results for "${debouncedValue}"`}
//                   posts={searchResult}
//                 />
//               )}
//             </div>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// export default SearchButtonMobile;

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

function SearchButtonMobile() {
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
    setShowSearchbar(false);
  }, [pathname]);

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
    <div className="">
      <div
        className={`relative overflow-hidden h-[42px] w-[42px] flex items-center justify-center rounded-full bg-gray-50 dark:bg-custom-gray2 shadow-md`}
      >
        <button
          type="button"
          className={`absolute p-1 h-7 w-7 bg-gray-200 dark:bg-custom-gray3 rounded-full ${
            showSearchbar && "-rotate-90"
          }`}
          onClick={() => {
            setShowSearchbar(!showSearchbar);
            setTitle("");
          }}
        >
          {!showSearchbar ? <MagnifyingGlassIcon /> : <XMarkIcon />}
        </button>
      </div>
      {showSearchbar && (
        <div className="absolute mt-4 inset-x-2">
          <div className="relative flex items-center w-full text-gray-900 bg-gray-50 rounded-full shadow-md dark:bg-custom-gray2 dark:text-gray-50">
            <label className="flex">
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
              className={`p-3 outline-none w-full text-gray-900 bg-gray-50 rounded-full dark:bg-custom-gray2 dark:text-gray-50`}
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
