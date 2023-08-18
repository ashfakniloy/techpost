// import { Editor } from "@tiptap/react";
// import React, { useState, useCallback } from "react";
// import { LinkIcon } from "./Icons/LinkIcon";
// import useToggle from "@/hooks/useToggle";
// import { Cancel } from "./Icons/Cancel";

// function LinkButton({
//   editor,
//   currentTheme,
// }: {
//   editor: Editor | null;
//   currentTheme: string | undefined;
// }) {
//   const {
//     toggle: showLinkModal,
//     setToggle: setShowLinkModal,
//     node,
//   } = useToggle();

//   const [url, setUrl] = useState("");

//   const handleButtonClick = () => {
//     setShowLinkModal(!showLinkModal);
//     setUrl(editor?.getAttributes("link").href);
//     // setIsOpen(true);
//     // editor?.chain().focus().scrollIntoView().run();
//     // editor?.commands.focus();
//     // onClick={() => editor.chain().focus().setImage({src: '', alt: '', title: ''}).run()}
//     // disabled={!editor.can().chain().focus().undo().run()}
//   };

//   // const handleAddLink = useCallback(() => {
//   //   if (url) {
//   //     editor
//   //       ?.chain()
//   //       .focus()
//   //       .extendMarkRange("link")
//   //       .setLink({ href: url, target: "_blank" })
//   //       .run();
//   //   } else {
//   //     editor?.chain().focus().extendMarkRange("link").unsetLink().run();
//   //   }
//   //   setShowLinkModal(false);
//   // }, [editor, url, setShowLinkModal]);

//   const handleAddLink = () => {
//     // if (url?.trim().length === 0) {
//     //   editor?.chain().focus().extendMarkRange("link").unsetLink().run();
//     //   // return;
//     // }

//     if (url) {
//       editor
//         ?.chain()
//         .focus()
//         .extendMarkRange("link")
//         .setLink({ href: url, target: "_blank" })
//         .run();
//     } else {
//       editor?.chain().focus().extendMarkRange("link").unsetLink().run();
//     }

//     setShowLinkModal(false);
//   };

//   const handleRemoveLink = useCallback(() => {
//     editor?.chain().focus().extendMarkRange("link").unsetLink().run();
//     setShowLinkModal(false);
//   }, [editor, setShowLinkModal]);

//   return (
//     <div ref={node} className="relative">
//       <button
//         type="button"
//         className={showLinkModal || editor?.isActive("link") ? "is-active" : ""}
//         onClick={handleButtonClick}
//         // onClick={() => editor.commands.setLink()}
//         // className={editor.isActive("blockquote") ? "is-active" : ""}
//         title="Link"
//       >
//         <span
//           className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
//         >
//           <LinkIcon />
//         </span>
//       </button>

//       {showLinkModal && (
//         <div className="absolute -left-[500%] mt-2 px-4 py-6 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px]">
//           <p className="text-lg">Add Link</p>
//           <button
//             type="button"
//             className="absolute top-2 right-2 p-0.5 rounded"
//             onClick={() => setShowLinkModal(false)}
//           >
//             <Cancel />
//           </button>

//           <div className="mt-2">
//             <input
//               type="url"
//               className="input-field"
//               name="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               required={true}
//             />
//             <div className="mt-3 flex justify-end items-center gap-3 text-white">
//               <button
//                 type="button"
//                 className="bg-red-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-red-800"
//                 onClick={handleRemoveLink}
//               >
//                 Remove
//               </button>
//               <button
//                 type="button"
//                 className="bg-blue-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-blue-800"
//                 onClick={handleAddLink}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LinkButton;

import { Editor } from "@tiptap/react";
import { useState, useCallback } from "react";
import { LinkIcon } from "./Icons/LinkIcon";
import { Cancel } from "./Icons/Cancel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function LinkButton({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const [url, setUrl] = useState(editor?.getAttributes("link").href || "");

  const handleButtonClick = () => {
    setShowLinkModal(!showLinkModal);
    setUrl(editor?.getAttributes("link").href);
    // setIsOpen(true);
    // editor?.chain().focus().scrollIntoView().run();
    // editor?.commands.focus();
    // onClick={() => editor.chain().focus().setImage({src: '', alt: '', title: ''}).run()}
    // disabled={!editor.can().chain().focus().undo().run()}
  };

  // const handleAddLink = useCallback(() => {
  //   if (url) {
  //     editor
  //       ?.chain()
  //       .focus()
  //       .extendMarkRange("link")
  //       .setLink({ href: url, target: "_blank" })
  //       .run();
  //   } else {
  //     editor?.chain().focus().extendMarkRange("link").unsetLink().run();
  //   }
  //   setShowLinkModal(false);
  // }, [editor, url, setShowLinkModal]);

  const handleAddLink = () => {
    // if (url?.trim().length === 0) {
    //   editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    //   // return;
    // }

    if (!url) return;

    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    setShowLinkModal(false);
    setUrl("");
  };

  console.log("state", editor?.getAttributes("link"));

  const handleRemoveLink = useCallback(() => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkModal(false);
  }, [editor, setShowLinkModal]);

  return (
    <Popover open={showLinkModal} onOpenChange={setShowLinkModal}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={
            showLinkModal || editor?.isActive("link") ? "is-active" : ""
          }
          onClick={handleButtonClick}
          // onClick={() => editor.commands.setLink()}
          // className={editor.isActive("blockquote") ? "is-active" : ""}
          title="Link"
        >
          <span
            className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
          >
            <LinkIcon />
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="mt-12 mx-5 lg:mx-0 lg:mt-4 p-4 relative bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px] rounded-lg">
        <p className="text-lg">Add Link</p>
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setShowLinkModal(false)}
        >
          <Cancel />
        </button>

        <form className="mt-2">
          <input
            type="url"
            className="input-field"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            required
          />
          <div className="mt-3 flex justify-end items-center gap-3">
            {!editor?.getAttributes("link").href ||
            editor?.getAttributes("link").href !== url ? (
              <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200"
                onClick={handleAddLink}
              >
                Add
              </button>
            ) : (
              <button
                type="button"
                // className="bg-transparent border border-gray-500  px-4 py-[7px] rounded text-sm font-bold hover:opacity-80 transition duration-200"
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200"
                onClick={handleRemoveLink}
              >
                Remove
              </button>
            )}
            {/* <button
              type="button"
              className="bg-transparent border border-gray-500  px-4 py-[7px] rounded text-sm font-bold hover:opacity-80 transition duration-200 disabled:cursor-not-allowed"
              onClick={handleRemoveLink}
              disabled={!url}
            >
              Remove
            </button>
            <button
              type="submit"
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200 disabled:cursor-not-allowed"
              onClick={handleAddLink}
              disabled={!!url}
            >
              Add
            </button> */}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default LinkButton;
