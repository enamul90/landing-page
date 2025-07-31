import React from 'react';
import Image from "next/image";

import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

const ProductSection = () => {
    return (
        <>
            <div className={"video-section lg:py-3 py-2 lg:mt-20 md:mt-16 mt-8"}>
                <h2 className={"lg:text-2xl md:text-xl text-lg text-white font-medium text-center"}>
                    আমাদের পণ্য সমূহ
                </h2>
            </div>

            {
                [1,1,1,].map((item) => (
                    <div className={"p-4 bg-Shave border border-Line rounded gap-6 items-center md:flex space-y-10 md:space-y-0"}>
                        <div className={"md:w-80 lg:w-100 w-full h-95 lg:h-130 shrink-0"}>
                            <Image
                                src={"/images/product.png"}
                                alt={"image"}
                                height={300}
                                width={300}
                                className={"h-full w-full object-cover"}
                            />
                        </div>

                        <div className={"space-y-4"}>
                            <div>
                                <h2 className={"lg:text-xl text-xl text-Text-100 font-medium  "}>প্রিমিয়াম কোয়ালিটির বোরকাটি পাচ্ছেন এখন ৪৭% ডিসকাউন্ট। প্রিমিয়াম কোয়ালিটির কাপড় এবং অরজিনাল </h2>
                                <p className={"mt-2 text-Text-75 font-medium"}>ভাসমান ফুল এবং একটি মনোমুগ্ধকর ফিট-এন্ড-ফ্লেয়ার সিলুয়েট এই সবুজ টায়ার্ড মিডিকে একটি মার্জিত পছন্দ করে তুলেছে। একটি বহুমুখী বিকল্প, মোটা ট্রেইনার বা স্ট্র্যাপি স্যান্ডেল পরে পরুন। </p>
                            </div>

                            <div className={"flex gap-6 items-center mt-3"}>
                                <h3 className={"text-xl text-Text-100 font-medium mt-1"}>
                                    $400.54 <span className={"text-Text-75 ms-4 line-through text-lg"}>$400.54</span>
                                </h3>

                                <div className={"flex gap-4 items-center border border-Line rounded-md  w-fit text-lg font-medium"}>
                                    <button className={"px-3  py-2 border-e border-Line "}>
                                        <IoMdRemove  />
                                    </button>

                                    01

                                    <button className={"px-3  py-2 border-s border-Line "}>
                                        <IoMdAdd />
                                    </button>
                                </div>
                            </div>

                            <div className={"mt-3 space-x-5"}>
                                <button className={"px-3 py-2 bg-primary rounded text-white font-medium cursor-pointer"}>
                                    ক্রয় করুন
                                </button>
                                <button className={"px-3 py-2 bg-secondary rounded text-white font-medium cursor-pointer"}>
                                    কার্ড এ যুক্ত করুন
                                </button>
                            </div>
                        </div>

                    </div>
                ))
            }

        </>
    );
};

export default ProductSection;