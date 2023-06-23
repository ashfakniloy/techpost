// import { useEffect } from "react";

// // Updates the height of a <textarea> when the value changes.
// const useAutosizeTextArea = (
//   textAreaRef: HTMLTextAreaElement | null,
//   value: string
// ) => {
//   useEffect(() => {
//     if (textAreaRef) {
//       // We need to reset the height momentarily to get the correct scrollHeight for the textarea
//       textAreaRef.style.height = "0px";
//       const scrollHeight = textAreaRef.scrollHeight;

//       // We then set the height directly, outside of the render loop
//       // Trying to set this with state or a ref will product an incorrect value.
//       textAreaRef.style.height = scrollHeight + 2 + "px";
//     }
//   }, [textAreaRef, value]);
// };

// export default useAutosizeTextArea;

import { useEffect, RefObject } from "react";

const useAutosizeTextArea = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    const updateTextAreaHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    };

    updateTextAreaHeight();

    // Call the update function whenever the content changes
    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("input", updateTextAreaHeight);
    }

    // Clean up the event listener
    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("input", updateTextAreaHeight);
      }
    };
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
