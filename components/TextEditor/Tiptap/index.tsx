"use client";

import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Toolbar from "./Toolbar";
// import { Color } from "@tiptap/extension-color";
import "./styles.css";

const Tiptap = ({
  article,
  setArticle,
}: {
  article: string;
  setArticle: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      Link.configure({
        openOnClick: false,
      }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Youtube,
      // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    ],

    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setArticle(html);

      // const json = editor.getJSON();
      // setArticle(JSON.stringify(json));
      // console.log("onUpdated", json);

      // const json = editor.getJSON();
      // setArticle(json);
      // setArticle("article", html);
    },
  });

  useEffect(() => {
    // this is just an example. do whatever you want to do here
    // to retrieve your editors content from somewhere
    editor?.commands.setContent(article);
  }, [editor?.contentComponent]);

  useEffect(() => {
    !article && editor?.chain().clearContent(true).run();
  }, [article]);

  return (
    <div>
      <Toolbar editor={editor} />
      <div>
        <EditorContent editor={editor} required={true} />
      </div>
    </div>
  );
};

export default Tiptap;
