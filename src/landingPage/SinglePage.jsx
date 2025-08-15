import React from 'react';
import PageNaveBar from "@/components/landingPage/PageNaveBar";
import PageTittle from "@/components/landingPage/PageTittle";
import ImageSlider from "@/components/landingPage/ImageSlider";
import VideoSection from "@/components/landingPage/VideoSection";
import ProductSection from "@/components/landingPage/ProductSection";
import ListData from "@/components/landingPage/ListDataSection";
import ReviewSection from "@/components/landingPage/ReviewSection";
import CheckOutSection from "@/components/landingPage/CheckOutSection";
import PageFooter from "@/components/landingPage/PageFooter";

const SinglePage = () => {
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
    ]

    const data2 = [
        "দৈনন্দিন বা বিশেষ অনুষ্ঠানের জন্য পারফেক্ট।",
        "প্রিমিয়াম চেরি ফ্যাব্রিক নরম, মসৃণ, এবং টেকসই, যা আপনাকে দিনভর আরাম দেবে।",
        "এই বোরকাটির সাথে থাকবে ফুল কভারেজ স্টোনের কাজ করা হিজাব।",
        "হিডেন পকেটস যা আপনার দৈনন্দিন প্রয়োজন মেটানোর জন্য চমৎকারভাবে ডিজাইন করা।",
        "হএই আবায়া হালকা ওজনের এবং আরামদায়ক, যা দীর্ঘ সময় পরলেও আপনাকে স্বাচ্ছন্দ্য দিবে।",
        "স্টাইলিশ, অথচ পরিপূর্ণ শালীনতায় মোড়ানো এই পোশাক আপনার প্রতিদিনের জীবনকে করবে আরও স্পেশাল।",

    ]

    return (
        <>
            <PageNaveBar />

            <div className={"container mx-auto max-w-6xl px-3  mt-3 lg:space-y-4 space-y-3"}>
                <PageTittle />
                <ImageSlider />
                <VideoSection />
                <ProductSection
                    product={[1]}
                />
                <ListData
                    data={data}
                    title={"কেন এই আবাটি বেছে নেবেন ?"}
                />
                <ListData
                    data={data2}
                    title={"আমাদের উপর কেন আপনি বিশ্বাস ও আস্থা রাখবেন ?"}
                />

                <ReviewSection
                    data={data2}
                    title={"দীর্ঘ সময় ধরে অসংখ্য গ্রাহকের ভালবাসা পেয়েছি, আপনি চাইলে আমাদের পেজের রিভিউ সেকশন টি চেক করতে পারেন, তাতে আমাদের ব্যাপারে একটা ভাল ধারনা পাবেন ইন শা আল্লাহ ! নিচে আমাদের প্রিয় কাস্টমারদের কিছু অনুভূতি শেয়ার করলাম"}
                />

                <CheckOutSection
                    title={"অর্ডার করতে নিচের ফর্মটি সঠিক ভাবে পুরন করুন"}
                    description={"বি:দ্র: অর্ডার করার জন্য আপনার নাম ,ঠিকানা মোবাইল নাম্বার , কালার এবং সাইজ সিলেকশন সঠিক আছে কিনা যাচাই করে নিবেন। যাতে কোন ভুল-ত্রুটি ছাড়াই আপনার কাঙ্খিত পণ্যটি আপনার হাতে পৌঁছে দিতে পারি। প্রয়োজন ব্যতীত অর্ডার করা থেকে বিরত থাকুন। একটি ভুল অর্ডার সম্পন্ন দায় আপনাকে নিতে হবে হয়তো দুনিয়াতে না হয় আখিরাতে।"}
                />

            </div>

            <PageFooter />

        </>
    );
};

export default SinglePage;