import { useState } from "react";
import { Link, X } from "lucide-react";

export default function SocialMediaInput({ value = [], onChange }) {
  const [platform, setPlatform] = useState("twitter");
  const [url, setUrl] = useState("");

  const platforms = [
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "Youtube" },
  ];

  const handleAddLink = () => {
    if (url.trim() !== "") {
      const updatedLinks = [...value, { platform, url }];
      onChange(updatedLinks); // parent update
      setUrl("");
      setPlatform("twitter");
    }
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = value.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="social-media"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Social Media Link
      </label>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Link
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
          <input
            type="url"
            id="social-media"
            name="social-media"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your social media URL"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
            ${
              !url.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary"
            }`}
        >
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-2">
          <ul className="space-y-2">
            {value.map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md border"
              >
                <span>
                  {link.platform}:{" "}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-Text-100 hover:underline"
                  >
                    {link.url}
                  </a>
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}