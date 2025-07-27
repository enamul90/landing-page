import { useState } from 'react';

export default function TextArea({LabelName = "Input", Placeholder = "input"}) {
    const [value, setValue] = useState('');

    return (
        <div className="mb-4">
            <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-1">
                {LabelName}
            </label>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={Placeholder}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                aria-describedby="textarea-field"
            />
        </div>
    );
}