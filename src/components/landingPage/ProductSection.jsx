"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Link from "next/link";
import API from "@/app/utils/axios";

const ProductSection = ({ productId, addToCart, products }) => {
  const [productTitle, setProductTitle] = useState("");
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajorSection = async () => {
      try {
        const res = await API.get("/configurepage/majorsection");
        setProductTitle(res.data.productTitle);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        if (productId) {
          // শুধু single product fetch
          const res = await API.get("/products");
          const product = res.data.find((p) => p._id === productId);
          // setProducts(product ? [product] : []);
        } else {
          // সব প্রোডাক্ট fetch
          const res = await API.get("/products");
          const filtered = res.data.filter((p) => p.showOnLanding === true);
          // setProducts(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchMajorSection();
  }, []);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="p-4 bg-Shave border border-Line rounded gap-6 items-center md:flex space-y-10 md:space-y-0 animate-pulse">
      <div className="md:w-80 lg:w-100 w-full h-95 lg:h-130 bg-gray-300 rounded"></div>
      <div className="space-y-4 w-full">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-3"></div>
        <div className="flex gap-4 items-center mt-3">
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="video-section lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8">
        <h2 className="lg:text-2xl md:text-xl text-lg text-white font-medium text-center">
          {loading ? "Loading..." : productTitle}
        </h2>
      </div>

      {products.length === 0
        ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
        : products.map((product, index) => (
            <div
              key={index}
              className="p-4 bg-Shave border border-Line rounded gap-6 items-center md:flex space-y-10 md:space-y-0"
            >
              <div className="md:w-80 lg:w-100 w-full h-95 lg:h-130 shrink-0">
                <Image
                  src={`/uploads/${product.image}`}
                  alt={product.name}
                  height={300}
                  width={300}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="md:text-xl text-lg text-Text-100 font-semibold">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-Text-75 font-medium md:text-base text-ms">
                    {product.description}
                  </p>
                </div>

                <div className="flex gap-6 items-center mt-3">
                  <h3 className="text-xl text-Text-100 font-medium mt-1 me-4">
                    ${product.sellPrice}{" "}
                    <span className="text-Text-75 line-through text-lg">
                      ${product.price}
                    </span>
                  </h3>

                  <div className="flex gap-4 items-center border border-Line rounded-md  w-fit text-lg font-medium">
                    <button className="px-3 py-2 border-e border-Line">
                      <IoMdRemove />
                    </button>
                    01
                    <button className="px-3 py-2 border-s border-Line">
                      <IoMdAdd />
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-x-5">
                  <Link
                    href="#card"
                    className="px-3 py-2 bg-primary rounded text-white font-medium cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                  >
                    ক্রয় করুন
                  </Link>
                  <Link
                    href="#allcard"
                    onClick={() => addToCart(product._id)}
                    className="px-3 py-2 bg-secondary rounded text-white font-medium cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                  >
                    কার্ড এ যুক্ত করুন
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default ProductSection;
