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
    // console.log("params", searchParams?.get("sort"));

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
            <SelectItem
              key={option}
              aria-label={option}
              value={option}
              // onClick={() => handleOptionClick(option)}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortBy;

// "use client";

// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import useToggle from "@/hooks/useToggle";

// function SortBy() {
//   const options = ["Recent", "Popular"];
//   const { toggle: isOpen, setToggle: setIsOpen, node } = useToggle();

//   const [selectedOption, setSelectedOption] = useState(options[0]);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   const handleOptionClick = (value: string) => {
//     setSelectedOption(value);
//     setIsOpen(false);
//     router.push(`${pathname}?sort=${value.toLowerCase()}`);
//     // router.replace(`${pathname}?sort=${value.toLowerCase()}`);
//   };

//   useEffect(() => {
//     // console.log("params", searchParams?.get("sort"));
//     const hasSort = searchParams?.has("sort");
//     const sort = searchParams?.get("sort");
//     !hasSort && setSelectedOption(options[0]);
//     sort === "recent" && setSelectedOption("Recent");
//     sort === "popular" && setSelectedOption("Popular");
//   }, [searchParams]);

//   return (
//     <div className="flex items-center gap-2 text-sm">
//       <p>Sort By:</p>

//       <div ref={node}>
//         <button
//           className={`flex justify-between items-center px-2 py-1.5 min-w-[100px] text-left bg-gray-50 shadow-md dark:bg-stone-800 rounded-md border  ${
//             isOpen ? "border-cyan-700" : "border-transparent"
//           }`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {selectedOption}
//           <span className={`h-5 w-5  ${isOpen && "rotate-180"}`}>
//             <ChevronDownIcon />
//           </span>
//         </button>

//         {isOpen && (
//           <div className="absolute rounded-md z-10 mt-2 min-w-[100px] border border-slate-300 dark:border-stone-500 shadow-md bg-gray-50 dark:bg-stone-800">
//             {options.map((option) => (
//               <div
//                 key={option}
//                 className={`cursor-pointer px-3 py-1.5 ${
//                   selectedOption === option
//                     ? "bg-gray-300 dark:bg-gray-500"
//                     : " hover:bg-gray-200  hover:dark:bg-gray-700"
//                 }`}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SortBy;
