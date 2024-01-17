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
  };

  const handleAddLink = () => {
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

  // console.log("state", editor?.getAttributes("link"));

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
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200"
                onClick={handleRemoveLink}
              >
                Remove
              </button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default LinkButton;
