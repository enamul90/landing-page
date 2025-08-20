"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import API from "@/app/utils/axios";

const PageNaveBar = () => {
  const [logo, setLogo] = useState("/logo/logo.png");
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setLogo(info.logo || "/logo/logo.png");
          setSocialLinks(info.socialLink || []);
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "instagram":
        return <Instagram size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={"shadow sticky top-0 bg-white z-50 py-2"}>
      <div
        className={
          "container mx-auto max-w-6xl px-3 flex flex-wrap items-center justify-between sticky top-0"
        }
      >
        <div className="w-14">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className={"h-full w-full object-cover"}
          />
        </div>

        <div className="flex gap-4 items-center">
          {loading ? (
            "Loading..."
          ) : (
            socialLinks.map((link) => (
              <Link
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {getIcon(link.platform)}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PageNaveBar;