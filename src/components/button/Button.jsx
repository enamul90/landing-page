import { useState } from 'react';

export default function Button({ children = 'Submit', type = 'button', disabled = false  }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type={type}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`px-6 py-2 rounded-md text-white font-medium transition-colors duration-200 cursor-pointer 
        ${disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : isHovered
                    ? 'bg-secondary'
                    : 'bg-secondary'
            } 
        focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
}