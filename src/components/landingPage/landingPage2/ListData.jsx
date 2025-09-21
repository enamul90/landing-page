import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const ListData = ({ data = [], title = "", subtitle = "" }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white p-3 shadow-lg mx-3 lg:p-6 lg:w-[600px] mb-16">
      {title && (
        <h2 className="text-2xl font-bold text-center text-[#CC2127] mb-4 lg:text-4xl">
          {title}
        </h2>
      )}
      {subtitle && <p className="text-lg font-semibold">{subtitle}</p>}
      {safeData.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <FaCircleCheck className="text-green-500" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

export default ListData;
