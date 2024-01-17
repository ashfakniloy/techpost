//with drag and drop
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Loader3 } from "../Loaders/Loader";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { deleteImage } from "@/db/mutations/deleteImage";

export const ImageField = ({
  label,
  name,
  isAdmin,
  ...props
}: {
  label?: string;
  name: string;
  required?: boolean;
  isAdmin?: boolean;
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [image, setImage] = useState<File | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageChanging, setImageChanging] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [dragging, setDragging] = useState(false);

  const { data: session } = useSession();

  const isAuthorzed =
    session?.user.role === "USER" ||
    (isAdmin && session?.user.role === "ADMIN");

  const imageValue = watch("imageUrl");
  const imageId = watch("imageId");

  const handleImageUpload = async () => {
    if (!isAuthorzed) {
      toast.error("Unauthorized");
      return;
    }

    if (!image) return;
    setImagePreview(URL.createObjectURL(image));

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
    const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", folder);
    // formData.append("folder", "nextjs13-fullstack-blog");

    setImageChanging(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setValue("imageUrl", data.secure_url);
        setValue("imageId", data.public_id);
      } else {
        console.log("error", data);
      }
    } catch (error) {
      console.log("error", error);
    }

    setImageChanging(false);
  };

  useEffect(() => {
    image && handleImageUpload();
  }, [image]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    e.preventDefault();

    const image = e.target.files[0];
    // handleImageUpload();
    setImage(image);
  };

  // // with server action
  const handleImageRemove = async () => {
    if (!isAuthorzed) {
      toast.error("Unauthorized");
      return;
    }

    setImageChanging(true);
    setImage(null);

    setValue("imageUrl", "");
    setValue("imageId", "");

    const result = await deleteImage({ imageId });

    console.log("result", result);

    if (result.error) {
      toast.error(result.error);
    }

    setImageChanging(false);
    setImageLoaded(false);
  };

  // // with route handler
  // const handleImageRemove = async () => {
  //   if (!isAuthorzed) {
  //     toast.error("Unauthorized");
  //     return;
  //   }

  //   setImageChanging(true);
  //   setImage(null);

  //   setValue("imageUrl", "");
  //   setValue("imageId", "");

  //   try {
  //     const response = await fetch(`/api/image?imageId=${imageId}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("success", data);
  //     } else {
  //       console.log("error", data);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }

  //   setImageChanging(false);
  //   setImageLoaded(false);
  // };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    !imageValue && setDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    !imageValue && setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const image = e.dataTransfer.files[0];
    !imageValue && setImage(image);

    // handleImageUpload(image);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2">
        {label}
      </label>
      <div
        className={`w-[170px] h-[170px] relative rounded-md flex justify-center items-center ${
          isAdmin
            ? "bg-gray-200 dark:bg-custom-gray5"
            : "bg-gray-200 dark:bg-custom-gray2"
        } ${dragging ? "border-dashed border-2 border-blue-500" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageValue && imageId ? (
          <div className="relative w-[170px] h-[170px]">
            <Image
              src={imageValue}
              // placeholder="blur"
              // blurDataURL={imagePreview}
              alt="image uploaded preview"
              fill
              sizes="170px"
              className="object-cover rounded-lg"
              onLoad={() => setImageLoaded(true)}
            />

            <button
              type="button"
              title="Remove Image"
              className="absolute top-1 right-1 p-[1px] rounded-full bg-white border border-black fill-black hover:scale-110"
              onClick={handleImageRemove}
            >
              <XMarkIcon className="w-5 h-5 text-black" />
            </button>
            {(imageChanging || !imageLoaded) && (
              <div className="relative w-[170px] h-[170px]">
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="image uploaded preview"
                    fill
                    sizes="10vw"
                    className="object-cover rounded-lg blur-sm"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader3 width="60" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!imageChanging ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id={name}
                  {...register(name)}
                  onChange={handleImageChange}
                  className="hidden"
                  {...props}
                />
                <label
                  htmlFor={name}
                  title="Choose an image from your device"
                  className={` shadow-md active:scale-95 transition-transform duration-100 text-sm font-bold px-3 py-1.5 rounded flex items-center cursor-pointer gap-1 ${
                    isAdmin
                      ? "bg-gray-50 dark:bg-custom-gray6"
                      : "bg-gray-50 dark:bg-custom-gray3"
                  }`}
                >
                  <span className="w-5 h-5">
                    <PlusIcon />
                  </span>
                  <span>Browse Image</span>
                </label>
                <p className="mt-5 text-xs absolute w-full text-center inset-x-0">
                  Or drop image here
                </p>
              </div>
            ) : (
              <Loader3 width="60" />
            )}
          </div>
        )}
        {errors[name] && (
          <p className="absolute left-0 text-sm text-red-600 -bottom-5">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
};

// // without drag and drop
// import { useFormContext } from "react-hook-form";
// import { useState } from "react";
// import Image from "next/image";
// import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
// import { Loader3 } from "../Loaders/Loader";

// export const ImageField = ({
//   label,
//   name,
//   isAdmin,
//   ...props
// }: {
//   label?: string;
//   name: string;
//   required?: boolean;
//   isAdmin?: boolean;
// }) => {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageChanging, setImageChanging] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");

//   const imageValue = watch("imageUrl");
//   const imageId = watch("imageId");

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       return;
//     }

//     const image = e.target.files[0];
//     setImagePreview(URL.createObjectURL(image));

//     const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//     const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
//     const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!;

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", preset);
//     formData.append("cloud_name", cloud_name);
//     formData.append("folder", folder);
//     // formData.append("folder", "nextjs13-fullstack-blog");

//     setImageChanging(true);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setValue("imageUrl", data.secure_url);
//         setValue("imageId", data.public_id);
//       } else {
//         console.log("error", data);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }

//     setImageChanging(false);
//   };

//   const handleImageRemove = async () => {
//     setImageChanging(true);

//     setValue("imageUrl", "");
//     setValue("imageId", "");

//     try {
//       const response = await fetch(`/api/image?imageId=${imageId}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log("success", data);
//       } else {
//         console.log("error", data);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }

//     setImageChanging(false);
//     setImageLoaded(false);
//   };

//   return (
//     <div className="max-w-[300px] relative">
//       <label htmlFor={name} className="inline-block mb-2">
//         {label}
//       </label>
//       <div
//         className={`w-[170px] h-[170px] relative rounded-md flex justify-center items-center ${
//           isAdmin
//             ? "bg-gray-200 dark:bg-custom-gray5"
//             : "bg-gray-200 dark:bg-custom-gray2"
//         }`}
//       >
//         {imageValue && imageId ? (
//           <div className="relative w-[170px] h-[170px]">
//             <Image
//               src={imageValue}
//               // placeholder="blur"
//               // blurDataURL={imagePreview}
//               alt="image uploaded preview"
//               fill
//               sizes="170px"
//               className="object-cover rounded-lg"
//               onLoad={() => setImageLoaded(true)}
//             />

//             <button
//               type="button"
//               title="Remove Image"
//               className="absolute top-1 right-1 p-[1px] rounded-full bg-white border border-black fill-black hover:scale-110"
//               onClick={handleImageRemove}
//             >
//               <XMarkIcon className="w-5 h-5 text-black" />
//             </button>
//             {(imageChanging || !imageLoaded) && (
//               <div className="relative w-[170px] h-[170px]">
//                 {imagePreview && (
//                   <Image
//                     src={imagePreview}
//                     alt="image uploaded preview"
//                     fill
//                     sizes="10vw"
//                     className="object-cover rounded-lg blur-sm"
//                   />
//                 )}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Loader3 width="60" />
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             {!imageChanging ? (
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id={name}
//                   {...register(name)}
//                   onChange={handleImageChange}
//                   className="hidden"
//                   {...props}
//                 />
//                 <label
//                   htmlFor={name}
//                   title="Choose an image from your device"
//                   className={` shadow-md active:scale-95 transition-transform duration-100 text-sm font-bold px-3 py-1.5 rounded flex items-center cursor-pointer gap-1 ${
//                     isAdmin
//                       ? "bg-gray-50 dark:bg-custom-gray6"
//                       : "bg-gray-50 dark:bg-custom-gray3"
//                   }`}
//                 >
//                   <span className="w-5 h-5">
//                     <PlusIcon />
//                   </span>
//                   <span>Add Image</span>
//                 </label>
//               </div>
//             ) : (
//               <Loader3 width="60" />
//             )}
//           </div>
//         )}
//         {errors[name] && (
//           <p className="absolute left-0 text-sm text-red-600 -bottom-5">
//             {errors[name]?.message?.toString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
