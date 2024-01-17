import type { Editor } from "@tiptap/react";
import { AlignLeft } from "./Icons/AlignLeft";
import { useTheme } from "next-themes";
import { AlignCenter } from "./Icons/AlignCenter";
import { AlignRight } from "./Icons/AlignRight";
import { BulletList } from "./Icons/BulletList";
import { NumberList } from "./Icons/NumberList";
import { Quote } from "./Icons/Quote";
import { Undo } from "./Icons/Undo";
import { Redo } from "./Icons/Redo";
import { HorizontalRule } from "./Icons/HorizontalRule";
import { ClearFormatting } from "./Icons/ClearFormatting";
import { Reset } from "./Icons/Reset";
import { PageBreak } from "./Icons/PageBreak";
import { Paragraph } from "./Icons/Paragraph";
import { Heading1 } from "./Icons/Heading1";
import { Heading2 } from "./Icons/Heading2";
import { Heading3 } from "./Icons/Heading3";
import LinkButton from "./LinkButton";
import ImageUpload from "./ImageUpload";
import YoutubeVideo from "./YoutubeVideo";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`tiptap-toolbar border ${
        editor.isFocused
          ? "border-stone-600 dark:border-stone-500"
          : " border-gray-300  dark:border-gray-700"
      }`}
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <b>B</b>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <i className="font-serif">I</i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <span className="underline underline-offset-2">U</span>
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        title="Align left"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <AlignLeft />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        title="Align center"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <AlignCenter />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        title="Align right"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <AlignRight />
        </span>
      </button>
      {/* <button
      type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title="Clear formatting"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <ClearFormatting />
        </span>
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
        title="Paragraph"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <Paragraph />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        title="Heading 1"
      >
        <span
          className={currentTheme === "dark" ? "fill-gray-50" : "fill-gray-700"}
        >
          <Heading1 />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title="Heading 2"
      >
        <span
          className={currentTheme === "dark" ? "fill-gray-50" : "fill-gray-700"}
        >
          <Heading2 />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        title="Heading 3"
      >
        <span
          className={currentTheme === "dark" ? "fill-gray-50" : "fill-gray-700"}
        >
          <Heading3 />
        </span>
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="Bullet list"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <BulletList />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="Ordered list"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <NumberList />
        </span>
      </button>
      {/* <button
      type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button> */}

      <LinkButton editor={editor} currentTheme={currentTheme} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title="Blockquote"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <Quote />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <HorizontalRule />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Page break"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <PageBreak />
        </span>
      </button>

      {/* <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button> */}

      <ImageUpload editor={editor} currentTheme={currentTheme} />

      <YoutubeVideo editor={editor} currentTheme={currentTheme} />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <Undo />
        </span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <Redo />
        </span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().clearContent(true).run()}
        disabled={!editor.can().chain().focus().clearContent().run()}
        title="Reset"
      >
        <span
          className={currentTheme === "dark" ? "fill-white" : "fill-gray-700"}
        >
          <Reset />
        </span>
      </button>
    </div>
  );
};

export default Toolbar;
