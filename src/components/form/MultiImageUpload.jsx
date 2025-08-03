import { useState } from 'react';
import {FiUpload} from "react-icons/fi";
import {IoClose} from "react-icons/io5";

export default function MultiImageUpload() {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const fileReaders = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then((images) => {
            setPreviews((prev) => [...prev, ...images]);
        });
    };

    const handleRemove = (indexToRemove) => {
        setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                Upload logos
            </label>
            <div className="relative">
                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-describedby="image-upload"
                />
                <div
                    className=" w-full p-2 bg-secondary"
                    role="button"
                    tabIndex={0}
                >
                    <div className="text-center flex items-center justify-center gap-3 text-white rounded-md">
                        <FiUpload />
                        <p >Upload images</p>
                    </div>
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
                                onClick={() => handleRemove(index)}
                                className="absolute top-0 right-0 p-1 bg-white rounded-full shadow hover:bg-red-100 group-hover:visible"
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
