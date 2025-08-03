import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ProductImage() {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Product Thumbnail
            </label>
            <div className="relative">
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-describedby="image-upload"
                />
                <div
                    className="w-full h-36 overflow-hidden border border-Line flex items-center justify-center bg-gray-50
                    hover:bg-gray-100 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2  rounded-md mx-auto shadow"
                    role="button"
                    tabIndex={0}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="Image preview"
                            className="min-w-full min-h-full object-contain rounded-md"
                        />
                    ) : (
                        <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-500" aria-hidden="true" />
                            <p className="mt-1 text-sm text-gray-600">upload an image</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}