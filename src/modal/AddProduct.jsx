"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import API from "@/app/utils/axios";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import SwitchToggle from "@/components/button/SwitchToggle";
import ProductImage from "@/components/form/ProductImage";
import MultiImageUpload from "@/components/form/MultiImageUpload";
import toast from "react-hot-toast";

const AddProduct = ({ Close }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    color: "",
    stock: 0,
    brand: "",
    price: 0,
    sellPrice: 0,
    description: "",
    image: "",
    gallery: [],
    showOnLanding: false,
  });

  // Input/TextArea Change
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Submit
const handleSubmit = async () => {
  try {
    let imageURL = formData.image;
    let galleryURLs = [...formData.gallery];

    // Upload thumbnail if it's a new file (base64)
    if (imageURL && imageURL.startsWith("data:")) {
      const form = new FormData();
      const blob = await (await fetch(imageURL)).blob();
      form.append("image", blob, "thumbnail.png"); // name doesn't matter, will be renamed
      const res = await API.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageURL = res.data.filename;
    }

    // Upload gallery images
    const newGallery = [];
    for (const img of galleryURLs) {
      if (img.startsWith("data:")) {
        const form = new FormData();
        const blob = await (await fetch(img)).blob();
        form.append("image", blob, "gallery.png");
        const res = await API.post("/upload", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newGallery.push(res.data.filename);
      } else {
        newGallery.push(img); // already uploaded image
      }
    }

    // Save product with uploaded image URLs
    const res = await API.post("/products", {
      ...formData,
      image: imageURL,
      gallery: newGallery,
    });
    if (res.status === 201) {
      Close(false);
      toast.success("Product Published!");
    }
  } catch (err) {
    console.error("Failed to add product:", err);
    toast.error("Failed to publish product");
  }
};


  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="w-full max-w-7xl max-h-[80%] bg-white rounded-md p-4 pt-0 overflow-y-auto">
        {/* Header */}
        <div className="py-2 flex items-center justify-between sticky top-0 bg-white pt-5 z-50">
          <h3 className="text-lg font-medium text-Text-100 uppercase">
            Add new product
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
              Placeholder="Type here"
              name="name"
              value={formData.name}
              onChange={(val) => handleChange("name", val)}
            />
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Product Size"
                Placeholder="10, 20, 30"
                name="size"
                value={formData.size}
                onChange={(val) => handleChange("size", val)}
              />
              <Input
                LabelName="Product Color"
                Placeholder="Black, Red"
                name="color"
                value={formData.color}
                onChange={(val) => handleChange("color", val)}
              />
            </div>
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Available Stock"
                Placeholder="Type here"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={(val) => handleChange("stock", val)}
              />
              <Input
                LabelName="Brand Name"
                Placeholder="Type here"
                name="brand"
                value={formData.brand}
                onChange={(val) => handleChange("brand", val)}
              />
            </div>
            <div className="md:flex gap-3 w-full">
              <Input
                LabelName="Price"
                Placeholder="Type here"
                name="price"
                type="number"
                value={formData.price}
                onChange={(val) => handleChange("price", val)}
              />
              <Input
                LabelName="Sell Price"
                Placeholder="Type here"
                name="sellPrice"
                type="number"
                value={formData.sellPrice}
                onChange={(val) => handleChange("sellPrice", val)}
              />
            </div>

            <TextArea
              LabelName="Description"
              Placeholder="Type here"
              name="description"
              value={formData.description}
              onChange={(val) => handleChange("description", val)}
            />

            <SwitchToggle
              label="Do you want to show the landing page?"
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
            className="py-2 px-3 text-secondary border border-secondary rounded-lg cursor-pointer"
          >
            Save Product
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-3 text-white bg-secondary rounded-lg cursor-pointer"
          >
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
