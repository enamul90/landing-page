"use client";

import API from "@/app/utils/axios";
import { CheckCircle, AlertTriangle, XCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import ListData from "./ListData";

export default function ProductDetails() {
  const [mobileNumber, setMobileNumber] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [listItems, setListItems] = useState([]);
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

    const fetchSecondarySection = async () => {
      try {
        const res = await API.get("/configurepage/secondarysection");

        if (res.data) {
          const onlyListItems = res.data.filter(
            (item) => item.showOnLanding && item.type === "List item"
          );
          setListItems(onlyListItems);
        }
      } catch (error) {
        console.error("Failed to fetch secondary section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
    fetchSecondarySection();
  }, []);

  return (
    <div className="bg-[#FFEEDD] flex flex-col items-center justify-center py-14">
      {listItems.length === 0
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse space-y-3 my-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
              </div>
            ))
        : listItems.map((item) => (
            <ListData
              key={item._id}
              data={Array.isArray(item.content) ? item.content : []}
              title={item.title}
              subtitle={item.subtitle || ""}
            />
          ))}
      {/* contact */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-lg mb-1">কল করুন</h1>
        <p className="text-[#CC2127] font-bold text-2xl lg:text-5xl mb-5">
          {loading ? "Loading..." : mobileNumber}
        </p>
        <button className="bg-[#CC2127] text-white px-6 py-3 rounded-sm text-sm font-semibold duration-500 hover:bg-[#68BD45] flex items-center gap-2">
          <Phone /> {loading ? "Loadin..." : whatsappNumber}
        </button>
      </div>
    </div>
  );
}