'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Sample images
const images = [
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',
    '/images/product.png',


];

const ImageSlider = () => {
    return (
        <>
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

export default ImageSlider;
