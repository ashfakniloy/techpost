import { useFormContext } from "react-hook-form";

type InputProps = {
  label?: string | JSX.Element;
  name: string;
  type: string;
  placeholder?: string;
  description?: string;
  autoComplete?: "on" | "off" | "true" | "false";
};

export function InputField({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative ">
      <label htmlFor={name} className="inline-block mb-2 cursor-pointer">
        {label}
      </label>
      <input
        type={type}
        id={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...props}
        {...register(name)}
        className="w-full p-2 bg-transparent border border-gray-300 rounded-md outline-none dark:border-gray-700 focus:border-stone-600 dark:focus:border-stone-500"
      />
      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
