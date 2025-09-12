"use client";

import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import API from "@/app/utils/axios";

const Footer = () => {
  const [footer, setFooter] = useState("");
  const [copyright, setCopyright] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcompanyinfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setCopyright(info.copyRight);
          setSocialLinks(info.socialLink || []);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCheckoutpart = async () => {
      try {
        const res = await API.get("/checkoutpart");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setFooter(info.footer);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutpart()
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
    <div className="fle flex-col items-center justify-center text-center py-12 mx-3 lg:mx-6">
      <h1 className="text-[#CC2127] font-bold mb-8 max-w-6xl mx-auto">
        {loading ? "Loading..." : footer}
      </h1>
      {/* social */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {loading
          ? "Loading..."
          : socialLinks.map((link) => (
              <a
                key={link._id}
                href={`https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#CA1B21] border border-gray-200 p-2 rounded-sm duration-500 hover:bg-[#CA1B21] hover:text-white"
              >
                {getIcon(link.platform)}
              </a>
            ))}
      </div>
      <h1 className="font-semibold text-sm">
        {loading ? "Loading..." : copyright}
      </h1>
    </div>
  );
};

export default Footer;
