import { useState } from "react";
import type { Editor } from "@tiptap/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ImageIcon } from "./Icons/ImageIcon";
import { Cancel } from "./Icons/Cancel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function ImageUpload({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const [showImageModal, setShowImageModal] = useState(false);

  const [image, setImage] = useState<Blob | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setImage(null);
      return;
    }

    const image = e.target.files[0];

    setImage(image);
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setIsLoading(true);

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
    const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", folder);

    // setImageChanging(true);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      // setImageUploaded(true);
      // console.log("success", data);
      setImageUrl(data.secure_url);

      setImageId(data.public_id);
      setImage(null);
      setShowImageModal(false);
      editor
        ?.chain()
        ?.focus()
        .setImage({
          src: data.secure_url,
          alt: "image alt",
          title: "image title",
        })
        .run();
    } else {
      console.log("error", data);
    }

    setIsLoading(false);
  };

  return (
    <Popover open={showImageModal} onOpenChange={setShowImageModal}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={showImageModal ? "is-active" : ""}
          onClick={() => setShowImageModal(!showImageModal)}
          title="Image"
        >
          <span
            className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
          >
            <ImageIcon />
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="mt-12 mx-5 lg:mx-0 lg:mt-4 p-4 relative bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px] rounded-lg">
        <div>
          <p className="text-lg">Add Image</p>
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setShowImageModal(false)}
          >
            <Cancel />
          </button>

          <div className="mt-5">
            {!image ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            ) : (
              <div>
                <div className="h-[170px] relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="user image"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1.5 right-1.5 bg-white rounded-full p-[2px] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
                    onClick={() => setImage(null)}
                  >
                    <XMarkIcon className="h-5 w-5 text-black" />
                  </button>
                </div>
                <div className="flex justify-end mt-3 text-white">
                  <button
                    type="button"
                    className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                    onClick={handleImageUpload}
                    disabled={isLoading}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ImageUpload;

// import { useState } from "react";
// import type { Editor } from "@tiptap/react";
// import Image from "next/image";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import { ImageIcon } from "./Icons/ImageIcon";
// import useToggle from "@/hooks/useToggle";
// import { Cancel } from "./Icons/Cancel";

// function ImageUpload({
//   editor,
//   currentTheme,
// }: {
//   editor: Editor | null;
//   currentTheme: string | undefined;
// }) {
//   const {
//     toggle: showImageModal,
//     setToggle: setShowImageModal,
//     node,
//   } = useToggle();

//   const [image, setImage] = useState<Blob | null>(null);

//   const [imageUrl, setImageUrl] = useState("");
//   const [imageId, setImageId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleButtonClick = () => {
//     setShowImageModal(!showImageModal);
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       // setImage(null);
//       return;
//     }

//     const image = e.target.files[0];

//     setImage(image);
//   };

//   const handleImageUpload = async () => {
//     if (!image) return;

//     setIsLoading(true);

//     const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//     const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", preset);
//     formData.append("cloud_name", cloud_name);
//     formData.append("folder", "nextjs13-fullstack-blog");

//     // setImageChanging(true);

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {
//       // setImageUploaded(true);
//       // console.log("success", data);
//       setImageUrl(data.secure_url);

//       setImageId(data.public_id);
//       setImage(null);
//       setShowImageModal(false);
//       editor
//         ?.chain()
//         ?.focus()
//         .setImage({
//           src: data.secure_url,
//           alt: "image alt",
//           title: "image title",
//         })
//         .run();
//     } else {
//       console.log("error", data);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div ref={node} className="relative">
//       <button
//         type="button"
//         className={showImageModal ? "is-active" : ""}
//         onClick={handleButtonClick}
//         title="Image"
//       >
//         <span
//           className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
//         >
//           <ImageIcon />
//         </span>
//       </button>

//       {showImageModal && (
//         <div className="absolute -left-[500%] mt-4 p-4 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px] rounded-lg">
//           <p className="text-lg">Add Image</p>
//           <button
//             type="button"
//             className="absolute top-2 right-2 p-0.5 rounded"
//             onClick={() => setShowImageModal(false)}
//           >
//             <Cancel />
//           </button>

//           <div className="mt-5">
//             {!image ? (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             ) : (
//               <div>
//                 <div className="h-[170px] relative">
//                   <Image
//                     src={URL.createObjectURL(image)}
//                     alt="user image"
//                     fill
//                     className="object-cover"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1.5 right-1.5 !bg-white !rounded-full !p-[2px] !border-2 border-red-600 hover:scale-110 transition-transform duration-200"
//                     onClick={() => setImage(null)}
//                   >
//                     <XMarkIcon className="h-5 w-5 text-black" />
//                   </button>
//                 </div>
//                 <div className="flex justify-end mt-3 text-white">
//                   <button
//                     type="button"
//                     className="bg-black text-white dark:bg-white dark:text-black !p-4 rounded text-sm font-bold hover:!bg-black dark:hover:!bg-white disabled:cursor-not-allowed"
//                     onClick={handleImageUpload}
//                     disabled={isLoading}
//                   >
//                     Upload Image
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;
