"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";



const TextEditor = () => {
    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                console.log(quill.root.innerHTML);
            });
        }
    }, [quill]);

    return (
        <div>
            <div ref={quillRef} style={{ height: "400px" }} />
        </div>
    );
};

export default TextEditor;
