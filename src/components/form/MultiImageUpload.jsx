"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function MultiImageUpload({ value = [], onChange }) {
  const [previews, setPreviews] = useState(value);

  // Sync parent value on mount/update
  useEffect(() => {
    setPreviews(value);
  }, [value]);

  // Handle new files
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      const newPreviews = [...previews, ...images];
      setPreviews(newPreviews);
      onChange(newPreviews); // Send updated array to parent
    });

    e.target.value = null; // Reset input to allow same file upload again
  };

  // Remove a selected image
  const handleRemove = (indexToRemove) => {
    const newPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(newPreviews);
    onChange(newPreviews); // Update parent
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="gallery"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Upload Gallery
      </label>

      {/* Upload Button */}
      <div className="relative">
        <input
          type="file"
          id="gallery"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-full p-2 bg-secondary cursor-pointer flex items-center justify-center rounded-md"
          role="button"
        >
          <FiUpload className="text-white mr-2" />
          <span className="text-white">Upload images</span>
        </div>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full shadow hover:bg-red-100"
              >
                <IoClose className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}