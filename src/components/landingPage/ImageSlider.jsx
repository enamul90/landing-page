"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API from "@/app/utils/axios";

// Sample images
const images = [
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
  "/images/product.png",
];

const ImageSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        {loading
          ? "Loading"
          : products.map((product, index) => (
              <SwiperSlide key={index}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[380px] md:h-[500px] object-cover"
                  />
                )}
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
