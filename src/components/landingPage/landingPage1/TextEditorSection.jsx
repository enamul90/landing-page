"use client";
import React from "react";
import Link from "next/link";

const TextEditorSection = ({ title, content, subtitle }) => {
  return (
    <div className="my-10">
      <div className="video-section lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8">
        <h2 className="lg:text-2xl md:text-xl text-lg text-white font-medium text-center">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="lg:text-lg text-base text-primary font-semibold text-center ">
          {subtitle}
        </p>
      )}
      <div
        className="prose my-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="mt-6 text-center">
        <Link
          href="#card"
          className="px-3 py-2 bg-primary rounded text-white font-medium cursor-pointer transition duration-300 ease-in-out hover:scale-105"
        >
          ক্রয় করতে আগ্রহী
        </Link>
      </div>
    </div>
  );
};

export default TextEditorSection;