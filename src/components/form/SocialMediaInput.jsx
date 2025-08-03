import { useState } from 'react';
import { Link } from 'lucide-react';
import Button from "@/components/button/Button";

export default function SocialMediaInput() {
    const [platform, setPlatform] = useState('twitter');
    const [url, setUrl] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);

    const platforms = [
        { value: 'twitter', label: 'Twitter' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'github', label: 'GitHub' },
    ];

    const handleAddLink = () => {
        if (url.trim() !== '') {
            setSocialLinks([...socialLinks, { platform, url }]);
            setUrl(''); // Clear input after adding
            setPlatform('twitter'); // Reset platform to default
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="social-media" className="block text-sm font-medium text-gray-700 mb-1">
                Social Media Link
            </label>
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 " aria-hidden="true" />
                    <input
                        type="url"
                        id="social-media"
                        name="social-media"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your social media URL"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        aria-describedby="social-media-input"
                    />
                </div>
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    aria-label="Select social media platform"
                >
                    {platforms.map((p) => (
                        <option key={p.value} value={p.value}>
                            {p.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddLink}
                    disabled={!url.trim()}
                    className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 
            ${!url.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary'} 
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    aria-disabled={!url.trim()}
                >
                    Add
                </button>
            </div>
            {socialLinks.length > 0 && (
                <div className="mt-2">
                    <ul className="space-y-1">
                        {socialLinks.map((link, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {link.platform}: <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-Text-100 hover:underline">{link.url}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}