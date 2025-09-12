"use client"

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import API from "@/app/utils/axios";

const HeroSection = () => {
  const [logo, setLogo] = useState("/logo/logo.png");
  const [pageName, setPageName] = useState()
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setLogo(info.logo || "/logo/logo.png");
          setPageName(info.pageName)
          setDescription(info.description);
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-6 md:px-3 flex flex-col items-center justify-center text-center pb-20 pt-10">
      {/* LOGO */}
      <div>
        <img
          src={`/uploads/${logo}`}
          alt="logo"
          className="mb-3 size-32 lg:size-40"
        />
      </div>
      {/* title */}
      <h1 className="font-bold text-[#FF0000] text-2xl mb-3 lg:text-5xl lg:mb-6">
        {loading ? "Loading..." : pageName}
      </h1>
      {/* description */}
      <p className="font-semibold text-[#000000] text-xl mb-5 lg:text-4xl lg:mb-8">
        {loading ? "Loading..." : description}
      </p>
      {/* button */}
      <a
        href={"#allcard"}
        className="text-white rounded-full cursor-pointer border-2 border-black font-bold p-1 
  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
      >
        <div className="bg-[#000000] flex items-center gap-2 text-sm lg:text-base px-6 py-3 rounded-full">
          <ShoppingCart />
          <p>অর্ডার করতে চাই</p>
        </div>
      </a>
    </div>
  );
};

export default HeroSection;
