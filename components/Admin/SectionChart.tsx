import { cn } from "@/lib/utils";

function SectionChart({
  title,
  children,
  className,
}: {
  title: string | JSX.Element;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gray-50 dark:bg-custom-gray6 p-4 lg:p-6 rounded-lg shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-montserrat font-semibold capitalize">
          {title}
        </h3>
        <p className="text-xs">{`Year: ${new Date().getFullYear()}`}</p>
      </div>
      <div className="mt-6 overflow-x-auto">{children}</div>
    </div>
  );
}

export default SectionChart;

// import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// function SectionChart({
//   title,
//   children,
//   className,
// }: {
//   title: string | JSX.Element;
//   children: React.ReactNode;
//   className?: string;
// }) {
//   const currentYear = new Date().getFullYear();
//   const selectedYear = 2020;

//   const years = Array.from(
//     { length: currentYear - selectedYear + 1 },
//     (_, index) => selectedYear + index
//   );

//   // console.log("years", years);

//   const handleClick = () => {
//     console.log("year selected");
//   };

//   return (
//     <div
//       className={cn(
//         "bg-gray-50 dark:bg-custom-gray6 py-6 px-6 rounded-lg shadow-md",
//         className
//       )}
//     >
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl font-semibold capitalize">{title}</h3>
//         {/* <p className="text-sm">{`Year: ${new Date().getFullYear()}`}</p> */}
//         <div className="text-sm flex items-center gap-1">
//           <span>Year:</span>
//           <Select defaultValue={currentYear.toString()}>
//             <SelectTrigger className="w-[90px]">
//               <SelectValue placeholder={currentYear.toString()} />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {/* <SelectLabel>Fruits</SelectLabel> */}
//                 {years &&
//                   years.map((year, i) => (
//                     <SelectItem
//                       key={i}
//                       value={year.toString()}
//                       onClick={handleClick}
//                     >
//                       {year}
//                     </SelectItem>
//                   ))}
//                 {/* <SelectItem value="apple">Apple</SelectItem>
//                 <SelectItem value="banana">Banana</SelectItem>
//                 <SelectItem value="blueberry">Blueberry</SelectItem>
//                 <SelectItem value="grapes">Grapes</SelectItem>
//                 <SelectItem value="pineapple">Pineapple</SelectItem> */}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div className="mt-6">{children}</div>
//     </div>
//   );
// }

// export default SectionChart;
