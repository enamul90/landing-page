"use client";
import React from "react";
import Link from "next/link";

const ImageSection = ({ title, content, subtitle }) => {
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
      <div className="flex items-center justify-center mt-5">
        <img
          src={content}
          alt={title}
          className="inline-block w-full max-w-md rounded-lg shadow"
        />
      </div>
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

export default ImageSection;