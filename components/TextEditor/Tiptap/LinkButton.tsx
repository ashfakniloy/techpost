import { Editor } from "@tiptap/react";
import React, { useState, useCallback } from "react";
import { LinkIcon } from "./Icons/LinkIcon";
import useToggle from "@/hooks/useToggle";
import { Cancel } from "./Icons/Cancel";

function LinkButton({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const {
    toggle: showLinkModal,
    setToggle: setShowLinkModal,
    node,
  } = useToggle();

  const [url, setUrl] = useState("");

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
  };

  const handleRemoveLink = useCallback(() => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkModal(false);
  }, [editor, setShowLinkModal]);

  return (
    <div ref={node} className="relative">
      <button
        type="button"
        className={showLinkModal || editor?.isActive("link") ? "is-active" : ""}
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

      {showLinkModal && (
        <div className="absolute -left-[500%] mt-2 px-4 py-6 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px]">
          <p className="text-lg">Add Link</p>
          <button
            type="button"
            className="absolute top-2 right-2 p-0.5 rounded"
            onClick={() => setShowLinkModal(false)}
          >
            <Cancel />
          </button>

          <div className="mt-2">
            <input
              type="url"
              className="input-field"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required={true}
            />
            <div className="mt-3 flex justify-end items-center gap-3 text-white">
              <button
                type="button"
                className="bg-red-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-red-800"
                onClick={handleRemoveLink}
              >
                Remove
              </button>
              <button
                type="button"
                className="bg-blue-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-blue-800"
                onClick={handleAddLink}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkButton;
