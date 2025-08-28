"use client";

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import API from "@/app/utils/axios";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import SwitchToggle from "@/components/button/SwitchToggle";
import ProductImage from "@/components/form/ProductImage";
import MultiImageUpload from "@/components/form/MultiImageUpload";
import toast from "react-hot-toast";

const EditProduct = ({ product, Close, onUpdated }) => {
  const [formData, setFormData] = useState(product || {});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await API.put("/products", { id: product._id, ...formData });
      if (res.status === 200) {
        Close(false);
        toast.success("Product updated successfully!");
        onUpdated(res.data);
      }
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update");
    } finally {
      setLoading(false)
    }
  };

  if (!formData) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="w-full max-w-7xl max-h-[80%] bg-white rounded-md p-4 pt-0 overflow-y-auto">
        {/* Header */}
        <div className="py-2 flex items-center justify-between sticky top-0 bg-white pt-5 z-50">
          <h3 className="text-lg font-medium text-Text-100 uppercase">
            Edit Product
          </h3>
          <button
            onClick={() => Close(false)}
            className="p-2 text-white bg-primary rounded-lg"
          >
            <MdClose />
          </button>
        </div>

        {/* Form */}
        <div className="mt-2 grid md:grid-cols-7 gap-6">
          <div className="md:col-span-5 space-y-2">
            <Input
              LabelName="Product Name"
              value={formData.name}
              onChange={(val) => handleChange("name", val)}
            />
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Product Size"
                value={formData.size}
                onChange={(val) => handleChange("size", val)}
              />
              <Input
                LabelName="Product Color"
                value={formData.color}
                onChange={(val) => handleChange("color", val)}
              />
            </div>
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Stock"
                type="number"
                value={formData.stock}
                onChange={(val) => handleChange("stock", val)}
              />
              <Input
                LabelName="Brand"
                value={formData.brand}
                onChange={(val) => handleChange("brand", val)}
              />
            </div>
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Price"
                type="number"
                value={formData.price}
                onChange={(val) => handleChange("price", val)}
              />
              <Input
                LabelName="Sell Price"
                type="number"
                value={formData.sellPrice}
                onChange={(val) => handleChange("sellPrice", val)}
              />
            </div>
            <TextArea
              LabelName="Description"
              value={formData.description}
              onChange={(val) => handleChange("description", val)}
            />
            <SwitchToggle
              label="Show on Landing?"
              value={formData.showOnLanding}
              onChange={(val) => handleChange("showOnLanding", val)}
            />
          </div>

          <div className="md:col-span-2">
            <ProductImage
              value={formData.image}
              onChange={(val) => handleChange("image", val)}
            />
            <MultiImageUpload
              value={formData.gallery}
              onChange={(val) => handleChange("gallery", val)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 space-x-4 text-center py-3">
          <button
            onClick={handleSubmit}
            className="py-2 px-3 text-white bg-secondary rounded-lg cursor-pointer"
          >
            {loading ? "Saving...." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;