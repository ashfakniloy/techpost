import { useState } from "react";
import { Cancel } from "./Icons/Cancel";
import { Editor } from "@tiptap/react";
import { VideoIcon } from "./Icons/VideoIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function YoutubeVideo({
  editor,
  currentTheme,
}: {
  editor: Editor | null;
  currentTheme: string | undefined;
}) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [url, setUrl] = useState("");
  const [width, setWidth] = useState<string>(null!);
  const [height, setHeight] = useState<string>(null!);

  const addYoutubeVideo = () => {
    if (!url) return;

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
    <Popover open={showVideoModal} onOpenChange={setShowVideoModal}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={showVideoModal ? "is-active" : ""}
          onClick={() => setShowVideoModal(!showVideoModal)}
          title="Video"
        >
          <span
            className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
          >
            <VideoIcon />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="relative mx-5 lg:mx-0 mt-4 p-4 bg-gray-50 dark:bg-custom-gray2 z-10 border border-gray-300 dark:border-gray-600 w-[300px] rounded-lg">
        <p className="text-lg">Add youtube video link</p>
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => setShowVideoModal(false)}
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
            required
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
                required
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
                required
              />
            </label>
          </div>
          <div className="mt-3 flex justify-end items-center gap-3 text-white">
            <button
              type="submit"
              className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded text-sm font-bold hover:opacity-80 transition duration-200"
              onClick={addYoutubeVideo}
            >
              Add
            </button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default YoutubeVideo;
