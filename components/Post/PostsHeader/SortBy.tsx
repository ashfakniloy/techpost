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
//       <p className="">Sort By:</p>

//       <div className="" ref={node}>
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

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function SortBy() {
  const options = ["Recent", "Popular"];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    router.push(`${pathname}?sort=${value.toLowerCase()}`);
  };

  useEffect(() => {
    // console.log("params", searchParams?.get("sort"));
    const hasSort = searchParams?.has("sort");
    const sort = searchParams?.get("sort");
    !hasSort && setSelectedOption(options[0]);
    sort === "recent" && setSelectedOption("Recent");
    sort === "popular" && setSelectedOption("Popular");
  }, [searchParams]);

  return (
    <div className="flex items-center gap-1 text-xs lg:gap-2 lg:text-sm">
      <p className="">Sort By:</p>

      <Listbox value={selectedOption} onChange={handleOptionClick}>
        <div className="relative mt-1">
          <Listbox.Button
            className={({ open }) =>
              `relative lg:w-full py-1.5 lg:py-2 w-[85px] pl-3 pr-6 lg:pr-10 text-left lg:min-w-[110px] bg-gray-50 shadow-md dark:bg-stone-800 rounded-md border border-transparent cursor-pointer focus:outline-none ${
                open && "border-red-300 dark:border-stone-500"
              }`
            }
          >
            <span className="block truncate">{selectedOption}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none lg:pr-2">
              <ChevronUpDownIcon
                className="w-3.5 h-3.5 text-gray-400 lg:w-5 lg:h-5"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-xs bg-gray-50 border rounded-md shadow-md lg:text-sm border-slate-300 dark:border-stone-500 dark:bg-stone-800 max-h-60 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-6 pr-1 lg:pl-8 lg:pr-4 ${
                      active && "bg-gray-200 dark:bg-gray-700"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 lg:pl-2 text-amber-600">
                          <CheckIcon className="w-4 h-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default SortBy;

// "use client";

// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Fragment } from "react";
// // import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function SortBy() {
//   const options = ["Recent", "Popular"];

//   const [selectedOption, setSelectedOption] = useState(options[0]);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   const handleOptionClick = (value: string) => {
//     setSelectedOption(value);
//     router.push(`${pathname}?sort=${value.toLowerCase()}`);
//   };

//   useEffect(() => {
//     setSelectedOption(options[0]);
//   }, []);

//   useEffect(() => {
//     // console.log("params", searchParams?.get("sort"));
//     const hasSort = searchParams?.has("sort");
//     const sort = searchParams?.get("sort");
//     !hasSort && setSelectedOption(options[0]);
//     sort === "recent" && setSelectedOption("Recent");
//     sort === "popular" && setSelectedOption("Popular");
//   }, [searchParams]);

//   return (
//     <div className="flex items-center gap-1 text-xs lg:gap-2 lg:text-sm">
//       <p className="">Sort By:</p>

//       <Select defaultValue={selectedOption} onValueChange={handleOptionClick}>
//         <SelectTrigger className="px-2 lg:px-3 w-[100px] text-left shadow-md bg-gray-50 dark:bg-stone-800 rounded-md border border-transparent cursor-pointer focus:outline-none">
//           <SelectValue placeholder={selectedOption} className="" />
//         </SelectTrigger>
//         <SelectContent className="bg-gray-50 dark:bg-stone-800 !w-[100px]">
//           {options.map((option) => (
//             <SelectItem
//               key={option}
//               value={option}
//               className=""
//               // onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* <Popover>
//         <PopoverTrigger asChild>
//           <button
//             type="button"
//             className={`relative lg:w-full py-1.5 lg:py-2 w-[85px] pl-3 pr-6 lg:pr-10 text-left lg:min-w-[110px] bg-gray-50 shadow-md dark:bg-stone-800 rounded-md border border-transparent cursor-pointer focus:outline-none ${
//               selectedOption && "border-red-300 dark:border-stone-500"
//             }`}
//           >
//             {selectedOption}
//           </button>
//         </PopoverTrigger>
//         <PopoverContent className=" z-10 p-0 w-[80px] lg:w-[120px] flex flex-col rounded-md text-black dark:text-gray-50 bg-gray-50 dark:bg-custom-gray2 text-xs lg:text-sm border border-gray-300 dark:border-gray-700 shadow whitespace-nowrap">
//           {options.map((option) => (
//             <button
//               key={option}
//               type="button"
//               className="w-full px-3  py-2 border-b border-gray-300  hover:bg-gray-200 dark:hover:bg-custom-gray3 dark:border-gray-700 text-start"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </PopoverContent>
//       </Popover> */}
//     </div>
//   );
// }

// export default SortBy;
