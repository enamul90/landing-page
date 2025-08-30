"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import API from "@/app/utils/axios";

export default function ProductImage({ value, onChange }) {
  const [preview, setPreview] = useState(value || null);

  useEffect(() => {
    setPreview(value || null); // parent value sync
  }, [value]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview দেখানোর জন্য
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Server এ আপলোড
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange && onChange(res.data.filename); // server URL parent কে পাঠানো
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Product Thumbnail
      </label>
      <div className="relative">
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-full h-36 overflow-hidden border border-Line flex items-center justify-center bg-gray-50
                     hover:bg-gray-100 transition-colors duration-200 rounded-md mx-auto shadow"
          role="button"
          tabIndex={0}
        >
          {preview ? (
            <img
              src={`/uploads/${preview}`}
              alt="Image preview"
              className="min-w-full min-h-full object-contain rounded-md"
            />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-500" />
              <p className="mt-1 text-sm text-gray-600">upload an image</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}