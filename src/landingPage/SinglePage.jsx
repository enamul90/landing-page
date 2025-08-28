"use client";

import React, { useEffect, useState } from "react";
import PageNaveBar from "@/components/landingPage/PageNaveBar";
import PageTittle from "@/components/landingPage/PageTittle";
import ImageSlider from "@/components/landingPage/ImageSlider";
import VideoSection from "@/components/landingPage/VideoSection";
import ProductSection from "@/components/landingPage/ProductSection";
import ListData from "@/components/landingPage/ListDataSection";
import ReviewSection from "@/components/landingPage/ReviewSection";
import CheckOutSection from "@/components/landingPage/CheckOutSection";
import PageFooter from "@/components/landingPage/PageFooter";
import API from "@/app/utils/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const SinglePage = () => {
  const params = useParams();
  const productId = params.id;
  const [title, setTitle] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    setCartProducts((prev) => [...prev, product]);
    toast.success(`Added to cart! ${product.name}`);
  };

  useEffect(() => {
    const fetchCardSection = async () => {
      try {
        const res = await API.get("/cardsection");
        if (res.data && res.data.length > 0) {
          const latestInfo = res.data[res.data.length - 1];
          setTitle(latestInfo.title);
          setDescription(latestInfo.description);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMajorSection = async () => {
      try {
        const res = await API.get("/configurepage/majorsection");
        setReviewTitle(res.data.reviewTitle);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajorSection();
    fetchCardSection();
  }, []);

  const data = [
    "দৈনন্দিন বা বিশেষ অনুষ্ঠানের জন্য পারফেক্ট।",
    "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
    "এই বোরকাটির সাথে থাকবে ফুল কভারেজ স্টোনের কাজ করা হিজাব।",
    "হিডেন পকেটস যা আপনার দৈনন্দিন প্রয়োজন মেটানোর জন্য চমৎকারভাবে ডিজাইন করা।",
    "হএই আবায়া হালকা ওজনের এবং আরামদায়ক, যা দীর্ঘ সময় পরলেও আপনাকে স্বাচ্ছন্দ্য দিবে।",
    "স্টাইলিশ, অথচ পরিপূর্ণ শালীনতায় মোড়ানো এই পোশাক আপনার প্রতিদিনের জীবনকে করবে আরও স্পেশাল।",
    "অরজিনাল এম সি স্টোন দিয়ে কাজ করা।",
    "ম্যাটেরিয়াল - পিওর সফট অরজিনাল দুবাই চেরি ফেব্রিক্স।",
    "মেজারমেন্ট - ৫০ | ৫২| ৫৪ |৫৬ বডি: ফ্রি সাইজ,১৫০+ গের",
  ];

  const data2 = [
    "দৈনন্দিন বা বিশেষ অনুষ্ঠানের জন্য পারফেক্ট।",
    "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
    "এই বোরকাটির সাথে থাকবে ফুল কভারেজ স্টোনের কাজ করা হিজাব।",
    "হিডেন পকেটস যা আপনার দৈনন্দিন প্রয়োজন মেটানোর জন্য চমৎকারভাবে ডিজাইন করা।",
    "হএই আবায়া হালকা ওজনের এবং আরামদায়ক, যা দীর্ঘ সময় পরলেও আপনাকে স্বাচ্ছন্দ্য দিবে।",
    "স্টাইলিশ, অথচ পরিপূর্ণ শালীনতায় মোড়ানো এই পোশাক আপনার প্রতিদিনের জীবনকে করবে আরও স্পেশাল।",
  ];

  return (
    <>
      <PageNaveBar />

      <div
        className={
          "container mx-auto max-w-6xl px-3  mt-3 lg:space-y-4 space-y-3"
        }
      >
        <PageTittle />
        <ImageSlider />
        <VideoSection />
        <ProductSection productId={productId} addToCart={handleAddToCart} />
        <ListData data={data} title={"কেন এই আবাটি বেছে নেবেন ?"} />
        <ListData
          data={data2}
          title={"আমাদের উপর কেন আপনি বিশ্বাস ও আস্থা রাখবেন ?"}
        />

        <ReviewSection
          data={data2}
          title={loading ? "Loading..." : reviewTitle}
        />

        <CheckOutSection
          title={loading ? "Loading..." : title}
          description={loading ? "Loading..." : description}
          product={cartProducts}
        />
      </div>

      <PageFooter />
    </>
  );
};

export default SinglePage;
