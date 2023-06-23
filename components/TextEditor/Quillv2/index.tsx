"use client";

import dynamic from "next/dynamic";
// import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Quill({
  article,
  setArticle,
}: {
  article: string;
  setArticle: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import("react-quill"), { ssr: false }),
  //   []
  // );

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      // ["undo", "redo"],
    ],
    history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
  };

  return (
    <ReactQuill
      theme="snow"
      value={article}
      onChange={setArticle}
      modules={modules}
    />
  );
}

export default Quill;
