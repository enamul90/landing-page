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

  const handleCardSubmit = async () => {
    setCardLoading(true);
    try {
      const res = await API.post("/cardsection", cardSection);
      toast.success("Card Section saved successfully!");
      setCardSection({ title: "", description: "", productPartTitle: "" });
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
  const [checkoutList, setCheckoutList] = useState([]);
  const [editId, setEditId] = useState(null); // MongoDB document _id

  const handleCheckoutChange = (key, value) => {
    setCheckout({ ...checkout, [key]: value });
  };

  // Fetch saved checkout parts from MongoDB
  const fetchCheckoutParts = async () => {
    try {
      const res = await API.get("/checkoutpart");
      setCheckoutList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching checkout parts!");
    }
  };

  useEffect(() => {
    fetchCheckoutParts();
  }, []);

  // Submit or update checkout part
  const handleCheckoutSubmit = async () => {
    setCheckoutLoading(true);
    try {
      if (editId) {
        // Update existing MongoDB document
        await API.put(`/checkoutpart/`, { ...checkout, id: editId });
        toast.success("Checkout Part updated successfully!");
      } else {
        // Create new MongoDB document
        await API.post("/checkoutpart", checkout);
        toast.success("Checkout Part saved successfully!");
      }

      setCheckout({
        title: "",
        sizes: [],
        colors: [],
        shippingCosts: [],
        footer: "",
      });
      setEditId(null);
      fetchCheckoutParts(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error saving checkout part!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Load data into form for editing
  const handleEditCheckout = (item) => {
    setCheckout(item);
    setEditId(item._id);
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
              children={cardLoading ? "Saving..." : "Update"}
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
            <label className="block text-sm font-medium mb-2">
              Shipping Costs
            </label>
            {checkout.shippingCosts.map((item, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  type="text"
                  placeholder="Location (e.g., Inside Dhaka)"
                  className="border rounded-md px-3 py-2 flex-1"
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
                  className="border rounded-md px-3 py-2 w-32"
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
            <button
              type="button"
              className="px-3 py-1 bg-blue-500 text-white rounded-md mt-2"
              onClick={() =>
                handleCheckoutChange("shippingCosts", [
                  ...checkout.shippingCosts,
                  { location: "", cost: 0 },
                ])
              }
            >
              + Add Shipping
            </button>
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
                checkoutLoading ? "Saving..." : editId ? "Update" : "Add"
              }
              onClick={handleCheckoutSubmit}
              disabled={checkoutLoading}
            />
          </div>
        </form>
      </div>

      {/* Display saved checkout parts */}
      {checkoutList.length > 0 && (
        <div className="p-4 bg-white rounded-md border border-Line mt-4">
          <h3 className="text-xl text-Text-100 mb-3 font-semibold">
            Saved Checkout Parts
          </h3>
          {checkoutList.map((item) => (
            <div
              key={item._id}
              className="border-b last:border-b-0 mb-2 pb-2 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Sizes:</strong> {item.sizes.join(", ")}
                </p>
                <p>
                  <strong>Colors:</strong> {item.colors.join(", ")}
                </p>
                <p>
                  <strong>Shipping Costs:</strong>{" "}
                  {item.shippingCosts
                    .map((s) => `${s.location}: ${s.cost}`)
                    .join(" | ")}
                </p>
                <p>
                  <strong>Footer:</strong> {item.footer}
                </p>
              </div>
              <Button onClick={() => handleEditCheckout(item)}>Edit</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigureCard;