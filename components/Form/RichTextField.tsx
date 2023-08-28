import { Controller, useFormContext } from "react-hook-form";
import Tiptap from "../TextEditor/Tiptap";

export const RichTextField = ({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleSetValue = (content: string) => {
    setValue(name, content);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2">
        {label}
      </label>
      <Controller
        name={name}
        {...props}
        render={({ field }) => (
          <Tiptap article={field.value} setArticle={handleSetValue} />
        )}
      />

      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
