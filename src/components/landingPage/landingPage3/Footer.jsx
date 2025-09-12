"use client"

import React, { useEffect, useState } from "react";
import API from "@/app/utils/axios";

const Footer = () => {
  const [copyRight, setcopyRight] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setcopyRight(info.copyRight);
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo()
  }, []);

  return (
    <div className="bg-[#006837] text-white text-center py-5">
      <h1 className="font-semibold mx-3">
        {loading ? "Loading..." : copyRight}
      </h1>
    </div>
  );
};

export default Footer;
