'use client';
import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewSection = ({ title = ""}) => {
    const images = [
        '/images/review1.png',
        '/images/review2.png',
        '/images/review3.png',
        '/images/review2.png',
    ];

    return (
        <>
            <div className={"reviewSection lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8"}>
                <h2 className={"lg:text-2xl md:text-xl text-lg text-white font-medium text-center"}>
                    {title}
                </h2>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={25}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="rounded overflow-hidden"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[380px] md:h-[500px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    );
};

export default ReviewSection;