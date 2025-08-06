"use client"
import React from 'react';
import Image from 'next/image';
import {MdDelete} from "react-icons/md";
import ImageUploadModal from "@/modal/ImageUploadModal";

const ReviewSection = () => {
    const images = [
        { src: '/images/review1.png', alt: 'Image 1' },
        { src: '/images/review2.png', alt: 'Image 2' },
        { src: '/images/review3.png', alt: 'Image 3' },
        { src: '/images/review3.png', alt: 'Image 3' },
        { src: '/images/review3.png', alt: 'Image 3' },
        { src: '/images/review3.png', alt: 'Image 3' },
        { src: '/images/review3.png', alt: 'Image 3' },
        { src: '/images/review3.png', alt: 'Image 3' },

    ];

    return (
        <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">


            <div className={"md:mb-8 mb-5 flex items-center justify-between"}>
                <h1 className="text-xl font-semibold text-Text-100 ">All Review</h1>

                <ImageUploadModal />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-4 ">
                    {images.map((image, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg
                        hover:scale-105 transition-transform duration-300 border border-Line"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={300}
                                height={300}
                                className="object-cover w-full h-64"
                                priority={index < 3} // Optimize loading for first few images
                            />

                            <button className={"absolute top-3 right-3 text-T"}>
                                <MdDelete className={"text-2xl font-semibold cursor-pointer"} />
                            </button>
                        </div>
                    ))}
                </div>

        </div>
    );
};

export default ReviewSection;