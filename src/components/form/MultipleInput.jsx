import React from 'react';
import { useState } from 'react';



const MultipleInput = ({data = ""}) => {
    const [url, setUrl] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);

    const handleAddLink = () => {
        if (url.trim() !== '') {
            setSocialLinks([...socialLinks, { url }]);
            setUrl('');
        }
    };


    return (
        <div className="mb-4">
            <label htmlFor="social-media" className="block text-sm font-medium text-gray-700 mb-1">
                {data}
            </label>
            <div className="flex items-stretch space-x-2">
                {/* URL Input */}
                <div className="relative flex-1">

                    <input
                        type="url"
                        id="social-media"
                        name="social-media"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={`Enter ${data}`}
                        className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Add Button */}
                <button
                    type="button"
                    onClick={handleAddLink}
                    disabled={!url.trim()}
                    className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 
                        ${!url.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary'} 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                    Add
                </button>
            </div>

            {/* Display Social Links */}
            {socialLinks.length > 0 && (
                <div className="mt-2">
                    <ul className="space-y-1">
                        {socialLinks.map((link, index) => (
                            <li key={index} className="text-base text-Text-100">
                                <h3
                                    className="text-Text-100 hover:underline"
                                >
                                    {link.url}
                                </h3>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultipleInput;