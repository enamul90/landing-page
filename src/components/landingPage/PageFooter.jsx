import React from 'react';
import { MdOutlineWhatsapp } from "react-icons/md";
import {IoIosCall, IoLogoYoutube} from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import {RiYoutubeLine} from "react-icons/ri";

const PageFooter = () => {
    return (
        <>
            <div className={"bg-[#575757]"}>
                <div className={"container py-5 mx-auto max-w-6xl px-3  mt-3  flex items-center justify-between"}>
                    <div className={"max-w-[800px]"}>
                        <h3 className={"text-lg font-medium text-white"}>About Company</h3>
                        <p className={"text-white/90"}>Open source is source code that is made freely available for possible modification and redistribution. Products include permission to use the source code, design documents, or content of the product.</p>
                    </div>

                    <div>
                        <div className={"flex items-center gap-2"}>
                            <MdOutlineWhatsapp className={"text-white text-lg"} />
                            <h5 className={"text-white"}>017229240879</h5>
                        </div>
                        <div className={"flex items-center gap-2 mt-1"}>
                            <IoIosCall className={"text-white text-lg"} />
                            <h5 className={"text-white"}>017229240879</h5>
                        </div>
                    </div>

                </div>
            </div>

            <div className={"bg-white py-3 shadow"}>
                <div className={"container mx-auto max-w-6xl flex flex-wrap gap-6 items-center justify-center"}>
                    <p className={"text-Text-75"}>All Rights Reserved</p>
                    <div className={"flex gap-3"}>
                        <FaFacebookF className={"text-secondary"} />
                        <IoLogoYoutube  className={"text-secondary"} />

                    </div>
                </div>
            </div>
        </>

    );
};

export default PageFooter;