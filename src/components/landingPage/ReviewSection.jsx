"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import API from "@/app/utils/axios";

const ReviewSection = ({ title = "" }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReview = async () => {
    try {
      setLoading(true);
      const res = await API.get("/review");
      const reviews = Array.isArray(res.data) ? res.data : [];
      setImages(reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <div className="reviewSection lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8">
        <h2 className="lg:text-2xl md:text-xl text-lg text-white font-medium text-center">
          {title}
        </h2>
      </div>

      {loading ? (
        <p>Loading reviews...</p>
      ) : images.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
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
          {images.map((image) => (
            <SwiperSlide key={image._id}>
              <img
                src={image.image}
                alt="Review Image"
                className="w-full h-[380px] md:h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ReviewSection;