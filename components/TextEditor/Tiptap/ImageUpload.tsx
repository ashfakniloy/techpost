import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ImageIcon } from "./Icons/ImageIcon";
import useToggle from "@/hooks/useToggle";
import { Cancel } from "./Icons/Cancel";

function ImageUpload({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const {
    toggle: showImageModal,
    setToggle: setShowImageModal,
    node,
  } = useToggle();

  const [image, setImage] = useState<Blob | null>(null);
  const [imageStorage, setImageStorage] = useLocalStorage<
    string | ArrayBuffer | null
  >("image", null);

  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  // const [preview, setPreview] = useLocalStorage("preview", "");

  // useEffect(() => {
  //   const reader = new FileReader();

  //   // reader.readAsDataURL(image);

  //   // reader.addEventListener("load", () => {
  //   //   localStorage.setItem("thumbnail", reader.result);
  //   // });

  //   reader.addEventListener("load", () => {
  //     // localStorage.setItem("recent-image", reader.result);
  //     // setUrl(localStorage.getItem("recent-image"));
  //     setImageStorage(reader.result);
  //   });
  // }, [image]);

  // useEffect(() => {
  //   if (!image) {
  //     setPreview(null);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(image);
  //   setPreview(objectUrl);

  //   console.log("image", image);

  //   // if (!preview) return;

  //   // editor
  //   //   .chain()
  //   //   .focus()
  //   //   .setImage({
  //   //     src: preview,
  //   //     alt: "image alt",
  //   //     title: "image title",
  //   //   })
  //   //   .run();

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [image]);

  // console.log("preview", preview);

  // useEffect(() => {
  //   editor
  //     ?.chain()
  //     ?.focus()
  //     .setImage({
  //       src: imageUrl,
  //       alt: "image alt",
  //       title: "image title",
  //     })
  //     .run();
  // }, [imageId]);

  const handleButtonClick = () => {
    setShowImageModal(!showImageModal);
    // editor?.chain().focus().scrollIntoView().run();
    // editor?.commands.focus();
    // onClick={() => editor.chain().focus().setImage({src: '', alt: '', title: ''}).run()}
    // disabled={!editor.can().chain().focus().undo().run()}
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setImage(null);
      return;
    }

    const image = e.target.files[0];

    setImage(image);

    // const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    // const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

    // const formData = new FormData();
    // formData.append("file", image);
    // formData.append("upload_preset", preset);
    // formData.append("cloud_name", cloud_name);
    // formData.append("folder", "nextjs13-fullstack-blog");

    // // setImageChanging(true);

    // const response = await fetch(
    //   `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );

    // const data = await response.json();

    // if (response.ok) {
    //   // setImageUploaded(true);
    //   // console.log("success", data);
    //   setImageUrl(data.secure_url);
    //   // formik.setFieldValue("imageId", data.asset_id);
    //   setImageId(data.public_id);
    //   editor
    //     ?.chain()
    //     ?.focus()
    //     .setImage({
    //       src: data.secure_url,
    //       alt: "image alt",
    //       title: "image title",
    //     })
    //     .run();
    // } else {
    //   console.log("error", data);
    // }

    // const selectedFile = e.target.files as FileList;
    // setImage(selectedFile?.[0]);

    // const objectUrl = URL.createObjectURL(selectedFile?.[0]);
    // setPreview(objectUrl);

    // editor
    //   ?.chain()
    //   .focus()
    //   .setImage({
    //     src: objectUrl,
    //     alt: objectUrl,
    //     title: objectUrl,
    //   })
    //   .run();

    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile?.[0]);
    // reader.addEventListener("load", () => {
    //   // localStorage.setItem("recent-image", reader.result);
    //   // setUrl(localStorage.getItem("recent-image"));
    //   setImageStorage(reader.result);
    // });

    // editor
    //   .chain()
    //   .focus()
    //   .setImage({
    //     src: preview,
    //     alt: "image alt",
    //     title: "image title",
    //   })
    //   .run();
  };

  // useEffect(() => {
  //   if (!preview) return;
  //   editor
  //     ?.chain()
  //     .focus()
  //     .setImage({
  //       src: `${preview}`,
  //       alt: preview,
  //       title: "image title",
  //     })
  //     .run();
  // }, [preview]);

  const handleImageUpload = async () => {
    if (!image) return;

    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", "nextjs13-fullstack-blog");

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
      // formik.setFieldValue("imageId", data.asset_id);
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
  };

  return (
    <div ref={node} className="relative">
      <button
        type="button"
        className={showImageModal ? "is-active" : ""}
        onClick={handleButtonClick}
        title="Image"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <ImageIcon />
        </span>
      </button>

      {showImageModal && (
        <div className="absolute -left-[500%] mt-2 px-4 py-6 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px]">
          <p className="text-lg">Add Image</p>
          <button
            type="button"
            className="absolute top-2 right-2 p-0.5 rounded"
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
              <div className="">
                <div className=" h-[170px] relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="user image"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1.5 right-1.5 !bg-white !rounded-full !p-[2px] !border-2 border-red-600 hover:scale-110 transition-transform duration-200"
                    onClick={() => setImage(null)}
                  >
                    <XMarkIcon className="h-5 w-5 text-black" />
                  </button>
                </div>
                <div className="flex justify-end mt-3 text-white">
                  <button
                    type="button"
                    className=" bg-blue-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-blue-800"
                    onClick={handleImageUpload}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* {showImageModal && (
        <p className="mb-2 text-center">Add Image</p>
        
          // {!image ? (
          //   <div className="">
              // <input
              //   type="file"
              //   accept="image/*"
              //   onChange={handleImageChange}
              // />
          //   </div>
          // ) : (
            // <Image
            //   src={URL.createObjectURL(image)}
            //   alt="user image"
            //   fill
            //   className="object-cover"
            // />
          // )}
      )} */}
    </div>
  );
}

export default ImageUpload;
