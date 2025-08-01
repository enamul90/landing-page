'use client';
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useParams } from 'next/navigation';

import {menuItems} from "@/data/mainData"
import {FaSignOutAlt} from "react-icons/fa";


export function Sidebar({isOpen = true}) {
    const params = useParams();
    const {subPage, mainPage} = params;


    return (
        <aside
            className={`bg-back text-text-100 w-full flex flex-col h-screen transition-transform duration-300 ease-in-out `}
        >
            <div className=" flex items-center justify-center mt-10 mb-5 mx-auto w-full px-1">
                <div className="flex justify-center mb-6 h-[100px] w-fit mx-auto">
                    <Image src="/logo/logo.png" alt="Logo" width={100} height={100} className={'h-full w-full object-cover'} />
                </div>

            </div>

            <nav className="flex-1 ">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={` py-2 w-full ps-4 mb-3 text-white
                                   hover:bg-secondary hover:text-white
                                   transition-colors duration-300 ease-in-out ${mainPage === item.path && "bg-primary/60" +
                        " border-e-2 border-primary"} ${!isOpen && "justify-center"}`}>
                            <Link
                                href={`/${item.path}/${item.subMenu ? item.subMenu[0].replace(/\s+/g, '-').toLowerCase() : "submenu" }`}
                                className={"flex items-center gap-1 "}

                            >
                                {item.icon}
                                {isOpen && (
                                    <span  className="ms-2 transition-colors duration-300">
                                {item.name}
                            </span>
                                )}
                            </Link>



                            {
                                (item.subMenu  && mainPage === item.path ) && (
                                    <ul className="flex flex-col items-center gap-1 mt-3 ps-8  ">

                                            {

                                               item.subMenu.map((subItem ,index) =>(
                                                   <li className={`  w-full  px-2 border-s-2 py-1 cursor-pointer  ${ subPage === subItem.replace(/\s+/g, '-').toLowerCase() ? "border-white bg-primary/8 "     :"border-transparent bg-transparent" } key={subItem.path}>`}
                                                  >
                                                       <Link
                                                           href={`/${mainPage.replace(/\s+/g, '-')}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                                       >
                                                           {subItem}
                                                       </Link>

                                                 </li>
                                                    )
                                               )
                                             }

                                    </ul>
                                )
                            }

                        </li>
                    ))}

                    <li>
                        <button className={
                            "flex items-center gap-3 p-2 w-full px-4 mb-3 text-white cursor-pointer hover:bg-primary  transition-colors duration-300 ease-in-out "
                        }
                        >
                            <FaSignOutAlt />
                            Sign Out
                        </button>
                    </li>

                </ul>
            </nav>




        </aside>
    );
}