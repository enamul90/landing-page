"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API from "@/app/utils/axios";

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
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 12 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 15 },
        }}
      >
        {loading
          ? // -------- Skeleton Loader --------
            Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-[380px] md:h-[500px] bg-gray-300 animate-pulse rounded-lg" />
              </SwiperSlide>
            ))
          : products.flatMap((product) =>
              product.gallery && product.gallery.length > 0
                ? product.gallery.map((img, index) => (
                    <SwiperSlide key={product._id + "-" + index}>
                      <img
                        src={`/uploads/${img}`}
                        alt={product.name + " " + index}
                        className="w-full h-[380px] md:h-[500px] object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))
                : []
            )}
      </Swiper>
    </>
  );
};

export default ImageSlider;