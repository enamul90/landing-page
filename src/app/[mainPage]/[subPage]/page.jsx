'use client'
import React, from 'react';
import { useRouter } from 'next/navigation';
import {Sidebar} from "@/components/Layout/sidebar";
import Dashboard from "@/page/Dashboard";

import { useParams } from 'next/navigation';
import { IoMdShareAlt} from "react-icons/io";
import ProductList from "@/page/ProductList";
import OrderPage from "@/page/OrderPage";
import {GiHamburgerMenu} from "react-icons/gi";
import UpdatePassword from "@/page/UpdatePassword";
import SettingPage from "@/page/SettingPage";
import Drawer from "@/components/Layout/Drawer";

const Page = () => {
    const router = useRouter();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const params = useParams();
    const {mainPage} = params;

    const goLandingPage = () => {
        router.push("/landingPage");
    }


    return (
        <div className="flex h-screen bg-Back ">
            <Drawer status={drawerOpen} action={setDrawerOpen} />
            {/* Sidebar */}
            <div
                className={`bg-black/90 w-60  text-Text-100 transition-all duration-300 ease-in-out hidden lg:block `}>
                <Sidebar   />
            </div>

            {/* Main Content */}
            <div className="flex-1 shadow-lg h-full overflow-auto ">
                <header className="flex justify-between items-center px-4 py-4 bg-Shave rounded-xs sticky top-0 z-10 ">

                    <div className="flex items-center space-x-3 cursor-pointer ">

                        <button onClick={()=> setDrawerOpen(true)} className={" lg:hidden"}>
                            <GiHamburgerMenu className={'text-2xl text-Text-100'}  />
                        </button>
                        <h2 className=" text-xl md:text-2xl text-Text-100 font-bold">Dashboard</h2>
                    </div>

                    <button onClick={goLandingPage} className="bg-black px-2 py-1 text-white rounded cursor-pointer flex items-center gap-1 text-[14px] uppercase">
                        Landing Page
                        <IoMdShareAlt className={'text-lg'}/>
                    </button>
                </header>

                {
                    mainPage === "dashboard" && <Dashboard/>
                }

                {
                    mainPage === "product" &&  <ProductList />
                }
                {
                    mainPage === "order" &&  <OrderPage />
                }

                {
                    mainPage === "password" &&  <UpdatePassword />
                }

                {
                    mainPage === "setting" &&    <SettingPage />
                }



            </div>
        </div>
    )
};

export default Page;