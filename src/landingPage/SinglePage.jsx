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
import toast from "react-hot-toast";
import ImageSection from "@/components/landingPage/ImageSection";
import TextEditorSection from "@/components/landingPage/TextEditorSection";
import { useParams } from "next/navigation";

const SinglePage = () => {
  const params = useParams();
  const productId = params.id;
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
      <PageNaveBar />

      <div
        className={
          "container mx-auto max-w-6xl px-3  mt-3 lg:space-y-4 space-y-3"
        }
      >
        <PageTittle />
        <ImageSlider />
        <VideoSection />
        <ProductSection addToCart={handleAddToCart} products={products} />
        {listItems.length === 0
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="animate-pulse space-y-3 my-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              ))
          : listItems.map((item) => {
              switch (item.type) {
                case "List item":
                  return (
                    <ListData
                      key={item._id}
                      data={Array.isArray(item.content) ? item.content : []}
                      title={item.title}
                      subtitle={item.subtitle || ""}
                    />
                  );
                case "Single image":
                  return (
                    <ImageSection
                      key={item._id}
                      title={item.title}
                      content={item.content}
                      subtitle={item.subtitle || ""}
                    />
                  );
                case "Text editor":
                  return (
                    <TextEditorSection
                      key={item._id}
                      title={item.title}
                      content={item.content}
                      subtitle={item.subtitle || ""}
                    />
                  );
                default:
                  return null;
              }
            })}

        <ReviewSection title={loading ? "Loading..." : reviewTitle} />

        <CheckOutSection
          title={loading ? "Loading..." : title}
          description={loading ? "Loading..." : description}
          cartProducts={cartProducts} // ✅ prop নাম cartProducts করো
          setCartProducts={setCartProducts}
          onToggle={handleCheckboxChange}
        />
      </div>

      <PageFooter />
    </>
  );
};

export default SinglePage;
