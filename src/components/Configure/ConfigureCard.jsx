"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/button/Button";
import MultipleInput from "@/components/form/MultipleInput";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const ConfigureCard = () => {
  // ------------------ Section Card ------------------
  const [cardSection, setCardSection] = useState({
    title: "",
    description: "",
    productPartTitle: "",
  });
  const [cardLoading, setCardLoading] = useState(false);

  const handleCardChange = (key, value) => {
    setCardSection({ ...cardSection, [key]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      setCardLoading(true);
      try {
        const res = await API.get("/cardsection");
        if (res.data && res.data.length > 0) {
          const company = res.data[0];
          setCardSection({
            title: company.title || "",
            description: company.description || "",
            productPartTitle: company.productPartTitle || "",
          });
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Error fetching data!");
      } finally {
        setCardLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardSubmit = async () => {
    setCardLoading(true);
    try {
      const res = await API.post("/cardsection", cardSection);
      toast.success("Card Section saved successfully!");
      // setCardSection({ title: "", description: "", productPartTitle: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Error saving card section!");
    } finally {
      setCardLoading(false);
    }
  };

  // ------------------ Checkout Part ------------------
  const [checkout, setCheckout] = useState({
    title: "",
    sizes: [],
    colors: [],
    shippingCosts: [],
    footer: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckoutChange = (key, value) => {
    setCheckout({ ...checkout, [key]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      setCheckoutLoading(true);
      try {
        const res = await API.get("/checkoutpart");
        console.log("Checkout API Response:", res.data);
        if (res.data && res.data.length > 0) {
          const checkoutpart = res.data[0];
          setCheckout({
            title: checkoutpart.title || "",
            sizes: checkoutpart.sizes || [],
            colors: checkoutpart.colors || [],
            shippingCosts: checkoutpart.shippingCosts || [],
            footer: checkoutpart.footer || "",
          });
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Error fetching data!");
      } finally {
        setCheckoutLoading(false);
      }
    };
    fetchData();
  }, []);

  // Submit or update checkout part
  const handleCheckoutSubmit = async () => {
    setCheckoutLoading(true);
    try {
      await API.post("/checkoutpart", checkout);
      toast.success("Checkout Part saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error saving checkout part!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="px-3 mt-5">
      <h2 className="text-lg text-Text-100 font-medium mb-3 uppercase">
        Configure Card
      </h2>

      {/* Section Card */}
      <div className="p-4 bg-white rounded-md border border-Line mb-4">
        <h3 className="text-xl text-Text-100 mb-3 font-semibold">
          Section Title & Card Part
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            LabelName="Section Title"
            Placeholder="Type Section Title"
            value={cardSection.title}
            onChange={(val) => handleCardChange("title", val)}
          />
          <TextArea
            LabelName="Section Description"
            Placeholder="Type Section Description"
            value={cardSection.description}
            onChange={(val) => handleCardChange("description", val)}
          />
          <Input
            LabelName="Product Part Title"
            Placeholder="Type Product Part Title"
            value={cardSection.productPartTitle}
            onChange={(val) => handleCardChange("productPartTitle", val)}
          />
          <div className="text-end">
            <Button
              children={
                cardLoading ? "Saving..." : cardSection.title ? "Update" : "Add"
              }
              onClick={handleCardSubmit}
              disabled={cardLoading}
            />
          </div>
        </form>
      </div>

      {/* Checkout Part */}
      <div className="p-4 bg-white rounded-md border border-Line mb-4">
        <h3 className="text-xl text-Text-100 mb-3 font-semibold">
          Checkout Part
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            LabelName="Checkout Section Title"
            Placeholder="Type Checkout Section Title"
            value={checkout.title}
            onChange={(val) => handleCheckoutChange("title", val)}
          />

          <MultipleInput
            data="Product Size"
            value={checkout.sizes}
            onChange={(val) => handleCheckoutChange("sizes", val)}
          />

          <MultipleInput
            data="Product Color"
            value={checkout.colors}
            onChange={(val) => handleCheckoutChange("colors", val)}
          />

          {/* Shipping Costs */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Costs
            </label>
            {checkout.shippingCosts.map((item, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  type="text"
                  placeholder="Location (e.g., Inside Dhaka)"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary flex-1"
                  value={item.location}
                  onChange={(e) =>
                    handleCheckoutChange("shippingCosts", [
                      ...checkout.shippingCosts.map((s, i) =>
                        i === index ? { ...s, location: e.target.value } : s
                      ),
                    ])
                  }
                />
                <input
                  type="number"
                  placeholder="Cost"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={item.cost}
                  onChange={(e) =>
                    handleCheckoutChange("shippingCosts", [
                      ...checkout.shippingCosts.map((s, i) =>
                        i === index ? { ...s, cost: Number(e.target.value) } : s
                      ),
                    ])
                  }
                />
              </div>
            ))}
            <Button
              children={" + Add Shipping"}
              onClick={() =>
                handleCheckoutChange("shippingCosts", [
                  ...checkout.shippingCosts,
                  { location: "", cost: 0 },
                ])
              }
              disabled={checkoutLoading}
            />
          </div>

          <TextArea
            LabelName="Checkout Section Footer"
            Placeholder="Type Checkout Section Footer Text"
            value={checkout.footer}
            onChange={(val) => handleCheckoutChange("footer", val)}
          />

          <div className="text-end">
            <Button
              children={
                checkoutLoading
                  ? "Saving..."
                  : checkout.title
                  ? "Update"
                  : "Add"
              }
              onClick={handleCheckoutSubmit}
              disabled={checkoutLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigureCard;
