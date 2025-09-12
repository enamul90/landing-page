"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Sidebar } from "@/components/Layout/sidebar";
import Dashboard from "@/page/Dashboard";
import ProductList from "@/page/ProductList";
import OrderPage from "@/page/OrderPage";
import UpdatePassword from "@/page/UpdatePassword";
import SettingPage from "@/page/SettingPage";
import ReviewSection from "@/page/ReviewSection";
import ConfigureCard from "@/components/Configure/ConfigureCard";
import ConfigurePage from "@/components/Configure/ConfigurePage";
import Drawer from "@/components/Layout/Drawer";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdShareAlt } from "react-icons/io";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { mainPage } = params;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); 
    } else {
      setLoading(false); 
    }
  }, [router]);

  const goLandingPage = () => {
    window.open("/landingPage/1", "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex h-dvh bg-Back">
      <Drawer status={drawerOpen} action={setDrawerOpen} />
      {/* Sidebar */}
      <div className="bg-black/90 w-60 scrollbarDiv h-dvh overflow-auto pb-30 text-Text-100 transition-all duration-300 ease-in-out hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 shadow-lg h-dvh overflow-auto">
        <header className="flex justify-between items-center px-4 py-4 bg-Shave rounded-xs sticky top-0 z-10 shadow">
          <div className="flex items-center space-x-3 cursor-pointer">
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden">
              <GiHamburgerMenu className="text-2xl text-Text-100" />
            </button>
            <h2 className="text-xl md:text-2xl text-Text-100 font-bold">
              Dashboard
            </h2>
          </div>

          <button
            onClick={goLandingPage}
            className="bg-black px-2 py-1 text-white rounded cursor-pointer flex items-center gap-1 text-[14px] uppercase"
          >
            Landing Page
            <IoMdShareAlt className="text-lg" />
          </button>
        </header>

        {mainPage === "dashboard" && <Dashboard />}
        {mainPage === "product" && <ProductList />}
        {mainPage === "order" && <OrderPage />}
        {mainPage === "configure" && <ConfigurePage />}
        {mainPage === "card" && <ConfigureCard />}
        {mainPage === "review" && <ReviewSection />}
        {mainPage === "password" && <UpdatePassword />}
        {mainPage === "setting" && <SettingPage />}
      </div>
    </div>
  );
};

export default Page;