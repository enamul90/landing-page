"use client"

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/landingPage/landingPage2/HeroSection";
import VideoSection from "@/components/landingPage/landingPage2/VideoSection";
import ProductCard from "@/components/landingPage/landingPage2/ProductCard";
import ProductDetails from "@/components/landingPage/landingPage2/ProductDetails";
import CheckoutSection from "@/components/landingPage/landingPage2/CheckoutSection";
import Footer from "@/components/landingPage/landingPage2/Footer";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const Index = () => {
  const [title, setTitle] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchSecondarySection = async () => {
      try {
        const res = await API.get("/configurepage/secondarysection");

        if (res.data) {
          // শুধু list item গুলো আলাদা করি
          setListItems(res.data.filter((item) => item.showOnLanding));
        }
      } catch (error) {
        console.error("Failed to fetch secondary section:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      const res = await API.get("/products");
      const data = res.data.map((p) => ({
        ...p,
        checked: false,
      }));
      setProducts(data);
      setCartProducts(data);
    };

    fetchProducts();
    fetchSecondarySection();
    fetchMajorSection();
    fetchCardSection();
  }, []);

  const handleAddToCart = (productId) => {
    setCartProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, checked: true } : p))
    );

    // যদি product আগে cart এ না থাকে, add করো
    const addedProduct = products.find((p) => p._id === productId);
    if (addedProduct && !cartProducts.find((p) => p._id === productId)) {
      setCartProducts((prev) => [
        ...prev,
        { ...addedProduct, checked: true, quantity: 1 },
      ]);
    }

    if (addedProduct) {
      toast.success(`Added to cart! ${addedProduct.name}`);
    }
  };

  const handleCheckboxChange = (productId) => {
    setCartProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, checked: !p.checked } : p))
    );
  };

  return (
    <>
      <HeroSection />
      <VideoSection />
      <ProductCard addToCart={handleAddToCart} products={products} />
      <ProductDetails />
      <CheckoutSection
        title={loading ? "Loading..." : title}
        description={loading ? "Loading..." : description}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
        onToggle={handleCheckboxChange}
      />
      <Footer />
    </>
  );
};

export default Index;
