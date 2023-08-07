import React, { useState } from "react";
import { Cancel } from "./Icons/Cancel";
import useToggle from "@/hooks/useToggle";
import { Editor } from "@tiptap/react";
import { VideoIcon } from "./Icons/VideoIcon";

function YoutubeVideo({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const {
    toggle: showVideoModal,
    setToggle: setShowVideoModal,
    node,
  } = useToggle();

  const [url, setUrl] = useState("");
  const [width, setWidth] = useState<string>(null!);
  const [height, setHeight] = useState<string>(null!);

  const handleButtonClick = () => {
    setShowVideoModal(!showVideoModal);
    // setUrl(editor?.getAttributes("link").href);
    // setIsOpen(true);
    // editor?.chain().focus().scrollIntoView().run();
    // editor?.commands.focus();
    // onClick={() => editor.chain().focus().setImage({src: '', alt: '', title: ''}).run()}
    // disabled={!editor.can().chain().focus().undo().run()}
  };

  const addYoutubeVideo = () => {
    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Number(width) || 640,
        height: Number(height) || 480,
      });
    }

    setShowVideoModal(false);
    setUrl("");
  };

  return (
    <div ref={node} className="relative">
      <button
        type="button"
        className={showVideoModal ? "is-active" : ""}
        onClick={handleButtonClick}
        // onClick={() => editor.commands.setLink()}
        // className={editor.isActive("blockquote") ? "is-active" : ""}
        title="Video"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <VideoIcon />
        </span>
      </button>

      {showVideoModal && (
        <div className="absolute -left-[500%] mt-4 p-4 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px] rounded-lg">
          <p className="text-lg">Add youtube video link</p>
          <button
            type="button"
            className="absolute top-2 right-2 p-0.5 rounded"
            onClick={() => setShowVideoModal(false)}
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
            <div className="mt-2 flex justify-between items-center gap-2">
              <label>
                <span className="text-sm">Width</span>
                <input
                  type="number"
                  className="input-field"
                  name="width"
                  value={width ?? 640}
                  min="200"
                  max="1000"
                  onChange={(e) => setWidth(e.target.value)}
                  required={true}
                />
              </label>
              <label>
                <span className="text-sm">Height</span>
                <input
                  type="number"
                  className="input-field"
                  name="height"
                  value={height ?? 480}
                  min="200"
                  max="1000"
                  onChange={(e) => setHeight(e.target.value)}
                  required={true}
                />
              </label>
            </div>
            <div className="mt-3 flex justify-end items-center gap-3 text-white">
              {/* <button
            type="button"
            className="bg-red-800 !px-4 !py-4 rounded text-sm font-bold hover:!bg-red-800"
            onClick={handleRemoveLink}
          >
            Remove
          </button> */}
              <button
                type="button"
                className="bg-black text-white dark:bg-white dark:text-black !p-4 rounded text-sm font-bold hover:!bg-black dark:hover:!bg-white"
                onClick={addYoutubeVideo}
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

export default YoutubeVideo;
