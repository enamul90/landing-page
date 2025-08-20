"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { menuItems } from "@/data/mainData";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import API from "@/app/utils/axios";

export function Sidebar({ isOpen = true }) {
  const params = useParams();
  const { subPage, mainPage } = params;
  const router = useRouter();

  const [logo, setLogo] = useState("/logo/logo.png");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const info = res.data[0];
          setLogo(info.logo || "/logo/logo.png");
        }
      } catch (err) {
        console.error("Failed to fetch logo and social links:", err);
      }
    };

    fetchCompanyInfo();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await API.post("/user/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <aside
      className={` bg-back text-text-100 w-full flex flex-col transition-transform duration-300 ease-in-out `}
    >
      <div className=" flex items-center justify-center mt-10 mb-5 mx-auto w-full px-1">
        <div className="flex justify-center mb-6 h-[100px] w-fit mx-auto">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className={"h-full w-full object-cover"}
          />
        </div>
      </div>

      <nav className="flex-1 ">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={` py-2 w-full ps-4 mb-3 text-white
                                   hover:bg-primary/80 hover:text-white
                                   transition-colors duration-300 ease-in-out ${
                                     mainPage === item.path &&
                                     "bg-primary/60" + " "
                                   } ${!isOpen && "justify-center"}`}
            >
              <Link
                href={`/${item.path}/${
                  item.subMenu
                    ? item.subMenu[0].replace(/\s+/g, "-").toLowerCase()
                    : "submenu"
                }`}
                className={"flex items-center gap-1 "}
              >
                {item.icon}
                {isOpen && (
                  <span className="ms-2 transition-colors duration-300">
                    {item.name}
                  </span>
                )}
              </Link>

              {item.subMenu && mainPage === item.path && (
                <ul className="flex flex-col items-center gap-1 mt-3  ">
                  {item.subMenu.map((subItem, index) => (
                    <li
                      key={index}
                      className={` w-full border-e-3 py-1 cursor-pointer flex items-center gap-2 text-sm  
                                                       ${
                                                         subPage ===
                                                         subItem
                                                           .replace(/\s+/g, "-")
                                                           .toLowerCase()
                                                           ? "border-white font-semibold  "
                                                           : "border-transparent"
                                                       }`}
                    >
                      <span
                        className={"h-1 w-1 bg-white rounded-full inline-block"}
                      ></span>
                      <Link
                        href={`/${mainPage.replace(/\s+/g, "-")}/${subItem
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <button
              onClick={logout}
              className={
                "flex items-center gap-3 p-2 w-full px-4 mb-6 text-white cursor-pointer hover:bg-primary  transition-colors duration-300 ease-in-out "
              }
            >
              {loading ? <div className={"loader"}></div> : <FaSignOutAlt />}
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
