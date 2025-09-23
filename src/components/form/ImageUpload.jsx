
"use client";
import { useState } from "react";
import { Upload, ImagePlus } from "lucide-react";
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
        <div className="mb-6 flex justify-center">
            <div className="relative group">
                {/* File Input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />

                {/* Upload Area */}
                <div
                    className="w-36 h-36 flex items-center justify-center rounded-full overflow-hidden border-2 border-dashed border-gray-300
            bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm relative"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <div className="flex flex-col items-center text-gray-600">
                            <Upload className="h-8 w-8 text-gray-500 mb-1" />
                            <span className="text-sm">
                {uploading ? "Uploading..." : "Upload"}
              </span>
                        </div>
                    )}

                    {/* Hover Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <ImagePlus className="h-10 w-10 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
