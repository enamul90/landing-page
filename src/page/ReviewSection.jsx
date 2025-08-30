"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import ImageUploadModal from "@/modal/ImageUploadModal";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const ReviewSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await API.get("/review");
      const reviews = Array.isArray(res.data) ? res.data : [];
      setImages(reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
const handleDelete = async (id) => {
  toast(
    (t) => (
      <div>
        <p>Are you sure you want to delete this review?</p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                await API.delete(`/review?id=${id}`);
                setImages(images.filter((img) => img._id !== id));
                toast.dismiss(t.id);
                toast.success("Review deleted successfully!");
              } catch (error) {
                toast.dismiss(t.id);
                toast.error("Failed to delete review!");
              }
            }}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
};

  return (
    <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">
      <div className="md:mb-8 mb-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-Text-100">All Review</h1>
        <ImageUploadModal onUploadSuccess={fetchReviews} />
      </div>

      {loading ? (
        <p>Loading reviews...</p>
      ) : images.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border border-Line"
            >
              <Image
                src={`/uploads/${image.image}`}
                alt="Review Image"
                width={300}
                height={300}
                className="object-cover w-full h-64"
              />
              <button
                className="absolute top-3 right-3 text-T"
                onClick={() => handleDelete(image._id)}
              >
                <MdDelete className="text-2xl font-semibold cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;