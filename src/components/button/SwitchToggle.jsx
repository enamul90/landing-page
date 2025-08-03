"use Client"
import { useState } from 'react';

export default function SwitchToggle() {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="flex items-center space-x-3">

            <button
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                    ${enabled ? 'bg-secondary' : 'bg-gray-300'}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                        ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </button>
            <span className=" font-medium text-Text-100">Do you want to show the landing page?</span>
        </div>
    );
}
