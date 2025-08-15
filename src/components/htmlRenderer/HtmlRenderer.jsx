
import React from 'react';

export default function HtmlRenderer({ html }) {
    return (
        <div
            className="prose" // optional Tailwind class for styling HTML content
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
