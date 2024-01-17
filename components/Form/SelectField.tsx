import { useFormContext, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    watch,
  } = useFormContext();

  const fieldValue = watch(name);

  const [value, setValue] = useState(fieldValue);

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  // console.log("value", value);

  return (
    <div className="relative ">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <Controller
        name={name}
        {...props}
        render={({ field }) => (
          <Select
            value={value}
            onValueChange={field.onChange}
            // defaultValue={value}
          >
            <SelectTrigger className="outline-none capitalize !ring-0 !focus-visible:border-gray-700 w-[300px] bg-transparent border border-gray-300 rounded-md  dark:border-gray-700 active:border-stone-600 active:focus:border-stone-500">
              {value ? (
                <SelectValue placeholder={value} />
              ) : (
                <p className="text-muted-foreground">{placeholder}</p>
              )}
            </SelectTrigger>

            <SelectContent className="bg-white dark:bg-custom-gray2">
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="px-8 py-3 capitalize dark:focus:bg-gray-700"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
