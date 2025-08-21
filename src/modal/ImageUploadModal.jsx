import React from 'react';
import {useState} from 'react'
import Image from 'next/image';
import { MdUpload } from 'react-icons/md';
import API from '@/app/utils/axios';
import toast from 'react-hot-toast';

const ImageUploadModal = ({ onUploadSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

const handleUpload = async () => {
  if (!selectedImage) return;

  try {
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage); 
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await API.post("/review", { image: base64Image });
      toast.success("Image Uploaded!")

      if (res.status === 201) {
        setIsModalOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
        if (onUploadSuccess) onUploadSuccess();
      }
    };
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

  return (
    <div>
      {/* Add Review Button */}
      <button
        className="px-3 py-2 bg-secondary text-white rounded-md text-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Add Review
      </button>

      {/* Modal for Image Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-Text-100 mb-4">
              Upload Image
            </h2>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mb-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="object-cover w-full h-64 rounded-lg"
                />
              </div>
            )}

            {/* File Input */}
            <label className="flex items-center justify-center px-3 py-2 bg-secondary text-white rounded-md text-sm hover:scale-105 transition-transform duration-300 cursor-pointer mb-4">
              <MdUpload className="text-xl mr-2" />
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-2 bg-gray-300 text-Text-100 rounded-md text-sm hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-secondary text-white rounded-md text-sm hover:scale-105 transition-transform duration-300"
                onClick={handleUpload}
                disabled={!selectedImage}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadModal;