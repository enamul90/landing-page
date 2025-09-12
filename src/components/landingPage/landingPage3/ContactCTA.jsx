"use client";

import React, { useEffect, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import API from "@/app/utils/axios";

const ContactCTA = () => {
  const [mobileNumber, setMobileNumber] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setMobileNumber(info.mobileNumber);
          setWhatsappNumber(info.whatsappNumber);
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCardSection = async () => {
      try {
        const res = await API.get("/cardsection");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setTitle(info.title);
          setDescription(info.description);
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCardSection()
    fetchCompanyInfo();
  }, []);

  return (
    <div>
      {/* contact */}
      <div className="bg-black flex items-center justify-center flex-col py-5">
        <h1 className="text-white font-bold text-lg mb-2 lg:text-3xl">
          যেকোন প্রয়োজনে ফোন করুন ২৪/৭
        </h1>
        <p className="text-[#FE0000] font-bold text-2xl mb-4 lg:text-5xl lg:mb-5">
          {loading ? "Loading..." : mobileNumber}
        </p>
        {/* button */}
        <div className="flex items-center gap-3">
          {/*  */}
          <button
            className="text-white rounded-full cursor-pointer border-2 border-[#FF0000] font-bold p-1 
  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <div className="bg-[#FF0000] flex items-center gap-2 text-sm lg:text-2xl px-6 py-3 rounded-full">
              <IoCall />
              <p>{loading ? "Loading..." : mobileNumber}</p>
            </div>
          </button>
          {/*  */}
          <button
            className="text-white rounded-full cursor-pointer border-2 border-[#008000] font-bold p-1 
  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <div className="bg-[#008000] flex items-center gap-2 text-sm lg:text-2xl px-6 py-3 rounded-full">
              <FaWhatsapp />
              <p>{loading ? "Loading..." : whatsappNumber}</p>
            </div>
          </button>
        </div>
      </div>
      {/* button */}
      <div className="flex items-center justify-center py-8">
        <a
          href="#allcard"
          className="text-white rounded-full cursor-pointer border-2 border-black font-bold p-1 
  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <div className="bg-[#000000] flex items-center gap-2 text-sm lg:text-xl px-6 py-3 rounded-full">
            <ShoppingCart />
            <p>অর্ডার করতে চাই</p>
          </div>
        </a>
      </div>
      {/* title */}
      <div className="bg-black text-[#FE0000] py-7 flex items-center justify-center">
        <div className="bg-white px-3 py-8 mx-3 lg:mx-auto max-w-6xl rounded-lg text-center text-lg lg:text-4xl border-2 border-[#00937F] w-full">
          <h1 className="font-bold">{loading ? "Loading..." : title}</h1>
        </div>
      </div>
      {/*  */}
      <div className="text-[#FF0C0C] font-bold text-center py-5">
        <h1 className="mb-3 md:text-lg lg:mb-1 lg:text-2xl">
          প্রয়োজনে ফোন করুন {loading ? "Loading..." : mobileNumber}
        </h1>
        <p className="text-lg lg:max-w-4xl mx-auto lg:text-2xl">
        {loading ? "Loading..." : description}
        </p>
      </div>
    </div>
  );
};

export default ContactCTA;
