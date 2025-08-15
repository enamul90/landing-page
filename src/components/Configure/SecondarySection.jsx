import React from 'react';
import Image from "next/image";
import HtmlRenderer from "@/components/htmlRenderer/HtmlRenderer";

const SecondarySection = ({ section }) => {

    return (
        <div className="p-4 bg-white rounded-md border border-Line mb-4 mt-3">
            {/* Header */}
            <div className="flex justify-between mb-3">
                <h3 className="text-xl text-Text-100 font-semibold">
                    SECTION ID : {section.id}
                </h3>
                <span className="inline-block border-e-3 border-Line"></span>
            </div>

            {/* Title */}
            <div>
                <h3 className="text-Text-100 font-medium">{section.title}</h3>
                <p className="text-Text-75 text-sm mt-1">{section.subtitle}</p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-10 mt-2">
                <div className="flex items-center gap-2">
                    <h3 className="text-Text-100 font-medium">Data Type :</h3>
                    <p className="text-Text-75 text-sm mt-1">{section.type}</p>
                </div>
                <div className="flex items-center gap-2">
                    <h3 className="text-Text-100 font-medium">Section rank :</h3>
                    <p className="text-Text-75 text-sm mt-1">{section.rank}</p>
                </div>
                <div className="flex items-center gap-2">
                    <h3 className="text-Text-100 font-medium">
                        Do you want to show the landing page :
                    </h3>
                    <p className="text-Text-75 text-sm mt-1">{section.showOnLanding}</p>
                </div>
            </div>

            {/* Section Content */}
            <div className="mt-4">
                {section.contentType === "list" && (
                    <div className="space-y-2">
                        {section.content.map((text, index) => (
                            <h1 className="flex items-center" key={index}>
                                <span className="h-2 w-2 inline-block bg-secondary rounded-full"></span>
                                <span className="ms-3 text-sm">{text}</span>
                            </h1>
                        ))}
                    </div>
                )}

                {section.contentType === "image" && (
                    <div className="mt-6 max-w-[500px] mx-auto h-[500px]">
                        <Image
                            src={section.imageSrc}
                            alt=""
                            height={400}
                            width={400}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                )}

                {section.contentType === "html" && (
                    <div className="mt-6">
                        <HtmlRenderer html={section.html} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="text-end space-x-3 mt-4">
                <button className="text-sm font-medium text-white px-6 py-2 bg-secondary rounded-lg">
                    Delete
                </button>
                <button className="text-sm font-medium text-white px-6 py-2 bg-primary rounded-lg">
                    Edit Section
                </button>
            </div>
        </div>
    );
};

export default SecondarySection;