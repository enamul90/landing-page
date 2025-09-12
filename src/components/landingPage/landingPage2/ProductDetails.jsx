"use client";

import { CheckCircle, AlertTriangle, XCircle, Phone } from "lucide-react";

export default function ProductDetails() {
  return (
    <div className="bg-[#FFEEDD] flex flex-col items-center justify-center py-14">
      <div className="bg-white p-3 shadow-lg mx-3 lg:p-6 lg:w-[600px] mb-16">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#CC2127] mb-4 lg:text-4xl">
          বিবরণ
        </h2>

        {/* Subtitle */}
        <p className="text-lg font-semibold">premium quality Denim Jackets🔥</p>

        {/* Fabric Info */}
        <div className="mt-4">
          <p className="font-semibold">
            Fabric: <span>Denim Or Gabardine</span>
          </p>
          <p className="font-semibold">Colour and Wash Granted</p>
        </div>

        {/* Bullet points */}
        <ul className="mt-3 space-y-1 list-disc list-inside font-semibold">
          <li>১০০% এক্সপোর্ট</li>
          <li>১০০% কালার গ্যারান্টি</li>
          <li>280+ Gsm</li>
        </ul>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base font-semibold leading-relaxed">
          নিজের ডিজাইন এবং নিজের কারখানায় তৈরি, যার ফলে আমরা খুবই রিজনেবল
          প্রাইসে বেস্ট কোয়ালিটি প্রোডাক্ট দিতে পারি।
        </p>

        {/* Checklist */}
        <div className="mt-4 space-y-2">
          <p className="flex items-start gap-2 font-semibold text-sm">
            <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
            এক টাকাও এডভান্স ছাড়া, বাংলাদেশের যেকোনো প্রান্তে ক্যাশ অন ডেলিভারি
            নিতে পারবেন।
          </p>
          <p className="flex items-start gap-2 font-semibold text-sm">
            <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
            প্রোডাক্ট হাতে পাওয়ার পর পছন্দ টু সেম ছবি মতো না হলে এবং কোয়ালিটিতে
            সমস্যা প্রমাণিত না হলে রিটার্ন করতে পারবেন।
          </p>
        </div>

        {/* Warning */}
        <p className="mt-4 flex items-start gap-2 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5 mt-1" />
          ডেলিভারি ম্যানের সামনে চেক করে পেমেন্ট করবেন, পছন্দ না হলে চার্জ দিয়ে
          রিটার্ন করতে পারবেন !!
        </p>

        {/* Note */}
        <p className="mt-3 flex items-start gap-2 font-semibold text-sm">
          <XCircle className="text-red-500 w-5 h-5 mt-1" />
          দয়া করে পার্সোনাল লেভেলে অর্ডার দিবেন না, আমাদেরকে হোয়াটসঅ্যাপ
          নাম্বারে যোগাযোগ করলে অর্ডার নিশ্চিত হবে।
        </p>

        {/* Bottom Highlight */}
        <p className="text-center text-red-600 font-bold mt-6">
          কালার ১০০% গ্যারান্টি
        </p>
      </div>
      {/* contact */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-lg mb-1">কল করুন</h1>
        <p
          className="text-[#CC2127] font-bold text-2xl lg:text-5xl mb-5"
        >
          01406070224
        </p>
        <button className="bg-[#CC2127] text-white px-6 py-3 rounded-sm text-sm font-semibold duration-500 hover:bg-[#68BD45] flex items-center gap-2">
          <Phone /> 01310067832
        </button>
      </div>
    </div>
  );
}