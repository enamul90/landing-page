"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import API from "@/app/utils/axios";

export default function ImageUpload({ value, onChange }) {
  const [preview, setPreview] = useState(
    value ? `/uploads/${value}` : null // যদি DB তে filename থাকে
  );
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview দেখানোর জন্য
    setPreview(URL.createObjectURL(file));

    // upload backend
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // backend থেকে filename আসবে
      onChange && onChange(res.data.filename);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Logo
      </label>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-36 h-36 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50
            hover:bg-gray-100 transition-colors duration-200 rounded-full mx-auto"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="min-w-full min-h-full object-contain rounded-full"
            />
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-500" />
              <p className="mt-1 text-sm text-gray-600">
                {uploading ? "Uploading..." : "Upload an image"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}