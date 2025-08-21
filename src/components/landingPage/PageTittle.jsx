"use client";

import React, { useEffect, useState } from "react";
import API from "@/app/utils/axios";

const PageTittle = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajorSection = async () => {
      try {
        const res = await API.get("/configurepage/majorsection");
        setPageTitle(res.data.pageTitle);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajorSection();
  }, []);

  return (
    <div className={"md:p-4 p-2  bg-secondary text-center rounded-md"}>
      <h3 className={"lg:text-2xl md:text-xl text-lg text-white font-medium"}>
        {loading ? "Loading...." : pageTitle}
      </h3>
    </div>
  );
};

export default PageTittle;
