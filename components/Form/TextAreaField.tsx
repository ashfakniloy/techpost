import useAutosizeTextArea from "@/hooks/useAutoResizeTextarea";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

export const TextAreaField = ({
  label,
  placeholder,
  name,
  required,
  ...props
}: {
  label?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  props?: string[];
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const value = watch(name);

  useAutosizeTextArea(textAreaRef, value);

  const { ref, ...rest } = register(name);

  return (
    <div>
      <label htmlFor={name} className="inline-block mb-2">
        {label}
      </label>

      <textarea
        className={`input-field overflow-hidden resize-none min-h-[80px] `}
        {...rest}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        rows={1}
        placeholder={placeholder}
        {...props}
        id={name}
        required={required}
      />

      {errors[name] && (
        <p className="absolute -mt-1.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

// import useAutosizeTextArea from "@/hooks/useAutoResizeTextarea";
// import { useFormContext, Controller } from "react-hook-form";
// import { useRef } from "react";

// type ProfileProps = {
//   imageUrl: string;
//   imageId: string;
//   username: string;
//   bio: string;
//   facebook: string;
//   twitter: string;
// };

// export const TextAreaField = ({
//   label,
//   placeholder,
//   name,
//   // value,
//   required,
//   ...props
// }: {
//   label?: string;
//   placeholder?: string;
//   name: string;
//   // value: string;
//   required?: boolean;
//   props?: string[];
// }) => {
//   const {
//     register,
//     getValues,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

//   const value = watch(name);

//   useAutosizeTextArea(textAreaRef.current, value);

//   // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   //   setFieldValue(name, e.target.value);
//   // };

//   const { ref, ...rest } = register(name);

//   // const minHeight = `min-h-[80px]`;

//   return (
//     <div>
//       <label htmlFor={name} className="inline-block mb-2">
//         {label}
//       </label>

//       <div>
//         <textarea
//           className={`input-field overflow-hidden resize-none min-h-[80px]`}
//           // ref={(e) => {
//           //   ref(e);
//           //   textAreaRef}
//           // }
//           {...rest}
//           ref={(e) => {
//             ref(e);
//             textAreaRef.current = e;
//           }}
//           // rows={1}
//           placeholder={placeholder}
//           {...props}
//           // {...register(name)}
//           id={name}
//           // value={value}
//           // name={name}
//           // onChange={handleChange}
//           required={required}
//           // {...props}
//         />
//       </div>
//     </div>
//   );
// };
