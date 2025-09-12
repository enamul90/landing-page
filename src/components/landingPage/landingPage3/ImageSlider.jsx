"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
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
        // console.log("Fetched products:", res.data);
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
    <div
      className={
        "container mx-auto max-w-6xl px-3 lg:space-y-8 space-y-3 pb-20"
      }
    >
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
                        className="w-full h-[380px] md:h-[500px] object-cover rounded-lg border border-green-900"
                      />
                    </SwiperSlide>
                  ))
                : []
            )}
      </Swiper>
      {/* button */}
      <div className="flex items-center justify-center">
        <a
          href="#allcard"
          className="text-white rounded-full cursor-pointer border-2 border-[#FF0000] font-bold p-1 
  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <div className="bg-[#FF0000] flex items-center gap-2 text-sm lg:text-base px-6 py-3 rounded-full">
            <ShoppingCart />
            <p>অর্ডার করতে ক্লিক করুন</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ImageSlider;
