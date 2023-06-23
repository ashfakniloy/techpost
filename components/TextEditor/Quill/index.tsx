"use client";

// import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
// import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { formats, modules } from "./Quilltoolbar";
import "./styles.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Quill({
  article,
  setArticle,
}: {
  article: string;
  setArticle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="text-editor">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={article}
        onChange={setArticle}
        // placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Quill;
