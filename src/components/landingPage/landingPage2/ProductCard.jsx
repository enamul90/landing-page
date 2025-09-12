"use client";

import API from "@/app/utils/axios";
import React, { useEffect, useState } from "react";

const ProductCard = ({ productId, addToCart, products }) => {
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

  const filteredProducts = productId
    ? products.filter((p) => p._id === productId)
    : products;

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
    <div
      className={
        "container mx-auto max-w-6xl px-3  mt-3 lg:space-y-4 space-y-3"
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
        {filteredProducts.length === 0
          ? Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white drop-shadow-2xl p-2 rounded-lg"
              >
                <img
                  src={`/uploads/${product.image}`}
                  className="h-72 w-full mb-5 lg:h-80"
                />
                <h1 className="text-center text-[#026734] text-xl font-semibold mb-5">
                  {product.name}
                </h1>
                <div className=" space-y-1 text-[#FF0000] font-bold text-center text-sm mb-6">
                  <p>রেগুলার প্রাইস {product.sellPrice}টাকা</p>
                  <p>ডিস্কাউন্ট প্রাইস {product.price}টাকা</p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="bg-[#CC2127] text-white px-6 py-3 rounded-sm text-sm font-semibold duration-500 hover:bg-[#68BD45] mb-10"
                  >
                    অর্ডার করতে চাই
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductCard;
