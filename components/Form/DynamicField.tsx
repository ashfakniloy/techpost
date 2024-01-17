import { useFieldArray, useFormContext } from "react-hook-form";

const IconMinusCircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

// type Errors = {
//   [name: string]: {
//     [index: number]: {
//       [optionName: string]: {
//         message: string;
//       };
//     };
//   };
// };

type DynamicFieldProps = {
  name: string;
  optionNames: string[]; // An array of option names (e.g., ["quote", "author"])
  labels: string[]; // An array of label names (e.g., ["Quote", "Author"])
  type: string;
  maxLength: number;
};

export function DynamicField({
  name,
  optionNames,
  labels,
  type,
  maxLength,
  ...props
}: DynamicFieldProps) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
    rules: {
      maxLength: maxLength,
    },
  });

  return (
    <div className="relative">
      <div className="space-y-7">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-5 w-full">
            {optionNames.map((optionName, optionIndex) => (
              <div
                key={optionName}
                className={optionIndex === 1 ? "w-2/6" : "w-4/6"}
              >
                <label
                  htmlFor={`${optionName}-${index}`}
                  className="inline-block mb-2 cursor-pointer"
                >
                  {labels[optionIndex]} {index !== 0 && index + 1}
                </label>
                <div className="relative">
                  <div className="flex gap-1">
                    <input
                      type={type}
                      id={`${optionName}-${index}`}
                      {...props}
                      {...register(`${name}.${index}.${optionName}`)}
                      className="w-full p-2 bg-transparent border border-gray-300 rounded-md outline-none dark:border-gray-700 focus:border-stone-600 dark:focus:border-stone-500"
                    />
                    {(index > 0 || fields.length > 1) && optionIndex === 1 && (
                      <div className=" flex items-center">
                        <button
                          type="button"
                          title="Remove"
                          className="hover:text-red-500 rounded-full overflow-hidden"
                          onClick={() => remove(index)}
                        >
                          <IconMinusCircle />
                        </button>
                      </div>
                    )}
                  </div>

                  {errors?.[name] && (
                    <p className="absolute mt-0.5 text-sm text-red-600">
                      {/* @ts-ignore */}
                      {errors?.[name]?.[index]?.[optionName]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {fields.length < maxLength && (
        <div className="flex justify-end">
          <button
            type="button"
            title={`Add another field`}
            className="mt-[22px] text-xs font-bold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded border border-transparent hover:border-gray-500"
            onClick={() => append({})}
          >
            Add another
          </button>
        </div>
      )}
    </div>
  );
}
