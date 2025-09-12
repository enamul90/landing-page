"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiArrowRightCircle } from "react-icons/hi2";
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
    <div className="bg-[#C75728] clip">
      <div className="container mx-auto max-w-6xl px-6 md:px-3 flex flex-col items-center justify-center text-center pb-40 lg:pt-10 lg:pb-52">
        {/* LOGO */}
        <div>
          <Image
            src={`/uploads/${logo}`}
            width={100}
            height={100}
            alt="logo"
            className="mb-5"
          />
        </div>
        {/* title */}
        <h1 className="font-bold text-[#FBD60E] text-2xl mb-3 lg:text-5xl lg:mb-5">
          {loading ? "Loading..." : pageName}
        </h1>
        {/* description */}
        <p className="font-semibold text-[#EFF6EE] text-xl mb-5 lg:text-4xl lg:mb-6">
          {loading ? "Loading..." : description}
        </p>
        {/* button */}
        <a
          href="#allcard"
          className="flex items-center gap-2 text-white bg-[#CC2127] text-sm px-6 py-3 rounded-sm cursor-pointer hover:bg-black duration-300 font-bold lg:text-base"
        >
          <HiArrowRightCircle />
          <p>অর্ডার করতে চাই</p>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
