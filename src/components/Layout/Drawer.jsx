import React from 'react';
import {Sidebar} from "@/components/Layout/sidebar";
import { IoClose } from "react-icons/io5";


const Drawer = ({status = false, action}) => {
    return (
        <div
            className={` bg-neutral-900/80 z-50 
             w-full h-dvh fixed top-0 left-0  overflow-hidden
               transition-transform duration-500 ease-in-out 
              ${status ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className={"max-w-[350px] me-10 bg-neutral-900 h-dvh overflow-y-auto "}>
                <div onClick={()=>action(false)} className={"pt-3 px-3 flex justify-end sticky top-0"}>
                    <IoClose className={"text-white text-3xl"} />
                </div>
                <Sidebar/>
            </div>
        </div>
    );
};

export default Drawer;