import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const ListData = ({ data = [], title = "", subtitle = "" }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className={"container mx-auto max-w-6xl px-3 lg:space-y-4 space-y-3  py-10"}>
      <div className="bg-black rounded-lg py-6 lg:my-10 md:my-16 my-8">
        <h2 className="lg:text-4xl md:text-xl text-lg text-white font-semibold text-center">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="lg:text-lg text-base text-primary font-semibold text-center">
          {subtitle}
        </p>
      )}

      <div className="pt-2 space-y-5">
        {safeData.map((item, index) => (
          <h3
            key={index}
            className="flex items-center gap-4 text-black font-semibold lg:text-2xl text-base border-b pb-4 border-b-gray-300"
          >
            <span className="text-[#009344]">
              <FaCircleCheck className="text-4xl" />
            </span>
            {item}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default ListData;