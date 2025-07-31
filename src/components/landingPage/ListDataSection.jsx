import React from 'react';
import { SiFiledotio } from "react-icons/si";


const ListDataSection = ({data=[], title = ""}) => {
    return (
        <>
            <div className={"video-section lg:py-3 py-2 lg:mt-20 md:mt-16 mt-8"}>
                <h2 className={"lg:text-2xl md:text-xl text-lg text-white font-medium text-center"}>
                    {title}
                </h2>
            </div>

            <div className={"pt-4 space-y-3"}>

                {
                    data.map((item, index) => (
                        <h3 key={index} className={"flex items-center gap-4 text-primary font-semibold text-lg"}>
                            <span className={"text-secondary"} >
                                <SiFiledotio />
                            </span>
                            {item}
                        </h3>
                    ))
                }

            </div>

            <div className={"mt-6 text-center"}>
                <button className={"py-2 px-8 bg-primary rounded text-white font-medium  cursor-pointer"}>ক্রয় করতে আগ্রহী </button>
            </div>


        </>
    );
};

export default ListDataSection;