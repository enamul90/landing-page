import React, { useState } from "react";
import { Trash2 } from "lucide-react"; // delete icon

const MultipleInput = ({ data = "", value = [], onChange }) => {
  const [input, setInput] = useState("");

  // Add new item
  const handleAdd = () => {
    if (input.trim() !== "") {
      const updated = [...value, input.trim()];
      onChange(updated); // parent এ পাঠানো হলো
      setInput("");
    }
  };

  // Remove item
  const handleDelete = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated); // parent এ পাঠানো হলো
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {data}
      </label>

      {/* Input + Add button */}
      <div className="flex items-stretch space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter ${data}`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />

        <button
          type="button"
          onClick={handleAdd}
          disabled={!input.trim()}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 
            ${
              !input.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary"
            }`}
        >
          Add
        </button>
      </div>

      {/* Show added items */}
      {value.length > 0 && (
        <div className="mt-2">
          <ul className="space-y-1">
            {value.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <h3 className="text-gray-700">{item}</h3>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleInput;