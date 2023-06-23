// import { useFormContext, Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// type SelectProps = {
//   label: string;
//   name: string;
//   placeholder?: string;
//   options: string[];
//   autoComplete?: "on" | "off" | "true" | "false";
// };

// export function SelectField({
//   label,
//   name,
//   placeholder,
//   options,
//   ...props
// }: SelectProps) {
//   const {
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="relative ">
//       <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
//         {label}
//       </label>
//       <Controller
//         // id={name}
//         name={name}
//         {...props}
//         render={({ field }) => (
//           <Select onValueChange={field.onChange} defaultValue={field.value}>
//             <SelectTrigger className="outline-none capitalize !ring-0 !focus-visible:border-gray-700 w-[300px] bg-transparent border border-gray-300 rounded-md  dark:border-gray-700 active:border-stone-600 active:focus:border-stone-500">
//               {field.value && <SelectValue placeholder={placeholder} />}
//               {!field.value && (
//                 <p className="text-muted-foreground">{placeholder}</p>
//               )}
//             </SelectTrigger>

//             <SelectContent className="bg-custom-gray2">
//               {options.map((option) => (
//                 <SelectItem
//                   key={option}
//                   value={option}
//                   className="px-8 py-3 capitalize focus:bg-gray-700"
//                 >
//                   {option}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       />

//       {errors[name] && (
//         <p className="absolute mt-0.5 text-sm text-red-600">
//           {errors[name]?.message?.toString()}
//         </p>
//       )}
//     </div>
//   );
// }

import { useFormContext, Controller } from "react-hook-form";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type SelectProps = {
  label: string;
  name: string;
  placeholder?: string;
  options: string[];
  autoComplete?: "on" | "off" | "true" | "false";
};

export function SelectField({
  label,
  name,
  placeholder,
  options,
  ...props
}: SelectProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative ">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <Controller
        // id={name}
        name={name}
        {...props}
        render={({ field }) => (
          <Listbox
            value={field.value}
            onChange={field.onChange}
            defaultValue={field.value}
          >
            <div className="w-[300px] relative">
              <Listbox.Button
                id={name}
                className="flex justify-between w-full py-2 pl-3 text-left bg-transparent border border-gray-300 rounded-md outline-none cursor-pointer dark:border-gray-700 focus:border-stone-600 dark:focus:border-stone-500"
              >
                <span className="block capitalize truncate">
                  {!field.value
                    ? placeholder
                    : options.find((option) => option === field.value)}
                </span>
                <span className="pr-2 pointer-events-none ">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
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
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-gray-50 border rounded-md shadow-lg dark:border-gray-700 dark:bg-stone-800 max-h-60">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-gray-200 text-amber-900 dark:bg-stone-700 dark:text-amber-100"
                            : "text-gray-900 dark:text-white"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate capitalize ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
          // <Select onValueChange={field.onChange} defaultValue={field.value}>
          //   <SelectTrigger className="outline-none capitalize !ring-0 !focus-visible:border-gray-700 w-[300px] bg-transparent border border-gray-300 rounded-md  dark:border-gray-700 active:border-stone-600 active:focus:border-stone-500">
          //     {field.value && <SelectValue placeholder={placeholder} />}
          //     {!field.value && (
          //       <p className="text-muted-foreground">{placeholder}</p>
          //     )}
          //   </SelectTrigger>

          //   <SelectContent className="bg-custom-gray2">
          //     {options.map((option) => (
          //       <SelectItem
          //         key={option}
          //         value={option}
          //         className="px-8 py-3 capitalize focus:bg-gray-700"
          //       >
          //         {option}
          //       </SelectItem>
          //     ))}
          //   </SelectContent>
          // </Select>
        )}
      />

      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
