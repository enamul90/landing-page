"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange && onChange(html); // parent component এ পাঠানো
      });
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value; // initial value set করা
    }
  }, [quill, value]);

  return (
    <div>
      <div ref={quillRef} style={{ height: "400px" }} />
    </div>
  );
};

export default TextEditor;