"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineWhatsapp } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import API from "@/app/utils/axios";

const PageFooter = () => {
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [whatsappnum, setWhatsappnum] = useState("");
  const [copyright, setCopyright] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcompanyinfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setDescription(info.description);
          setNumber(info.mobileNumber);
          setWhatsappnum(info.whatsappNumber);
          setCopyright(info.copyRight);
          setSocialLinks(info.socialLink || []);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcompanyinfo();
  }, []);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={"bg-[#575757]"}>
        <div
          className={
            "container py-5 mx-auto max-w-6xl px-3 mt-3 md:flex items-center justify-between space-y-3"
          }
        >
          <div className={"max-w-[800px]"}>
            <h3 className={"text-lg font-medium text-white"}>About Company</h3>
            <p className={"text-white/90"}>
              {loading ? "Loading..." : description}
            </p>
          </div>

          <div className={"flex md:block items-center gap-3 justify-center"}>
            <div className={"flex items-center gap-2"}>
              <MdOutlineWhatsapp className={"text-white text-lg"} />
              <h5 className={"text-white"}>
                {loading ? "Loading..." : whatsappnum}
              </h5>
            </div>
            <div className={"flex items-center gap-2 mt-1"}>
              <IoIosCall className={"text-white text-lg"} />
              <h5 className={"text-white"}>
                {loading ? "Loading..." : number}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className={"bg-white py-3 shadow"}>
        <div
          className={
            "container mx-auto max-w-6xl flex flex-wrap gap-6 items-center justify-center"
          }
        >
          <p className={"text-Text-75"}>{loading ? "Loading..." : copyright}</p>
          <div className={"flex gap-3"}>
            {loading
              ? "Loading..."
              : socialLinks.map((link) => (
                  <a
                    key={link._id}
                    href={`https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-blue-600 transition"
                  >
                    {getIcon(link.platform)}
                  </a>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageFooter;