import { useState } from 'react';

export default function Input({LabelName = "Input", Placeholder = "input"}) {
    const [value, setValue] = useState('');

    return (
        <div className="mb-4 w-full">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
                {LabelName}
            </label>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={Placeholder}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                aria-describedby="input-field"
            />
        </div>
    );
}