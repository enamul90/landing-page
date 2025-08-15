
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {MdFileUpload} from "react-icons/md";
import TextEditor from "@/components/textEditor/TextEditor";

export default function CreateSectionModal({ onSave }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [dataType, setDataType] = useState('Lit data');
    const [rank, setRank] = useState('');
    const [showOnLanding, setShowOnLanding] = useState(true);
    const [listItems, setListItems] = useState(['']);
    const [htmlContent, setHtmlContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setDataType('List item');
        setRank('');
        setShowOnLanding(true);
        setListItems(['']);
        setHtmlContent('');
        setImagePreview(null);
    };

    const handleListChange = (value, index) => {
        const updated = [...listItems];
        updated[index] = value;
        setListItems(updated);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        const payload = {
            id: `#${Date.now()}`,
            title,
            subtitle,
            type: dataType,
            rank,
            showOnLanding: showOnLanding ? 'Yes' : 'No',
            contentType:
                dataType === 'Lit data'
                    ? 'list'
                    : dataType === 'Image'
                        ? 'image'
                        : 'html',
            content:
                dataType === 'Lit data'
                    ? listItems
                    : dataType === 'Image'
                        ? imagePreview
                        : htmlContent,
        };

        onSave && onSave(payload);
        resetForm();
        setIsOpen(false);
    };

    return (
        <>
            {/* Trigger Button */}
            <div className="text-end">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    + Create Section
                </button>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 bg-opacity-50 flex items-center justify-center px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative max-h-[90vh] overflow-y-auto">

                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setIsOpen(false);
                                resetForm();
                            }}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-Text-100 mb-4">
                            Create Section
                        </h2>

                        {/* Title */}
                        <div className="mb-3">
                            <label className="block text-sm text-Text-100">Section Title</label>
                            <input
                                placeholder="Type here"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-secondary"
                            />
                        </div>


                        {/* Data Type */}
                        <div className="mb-3">
                            <label className="block text-sm text-Text-100">Data Type</label>
                            <select
                                value={dataType}
                                onChange={(e) => setDataType(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-secondary"
                            >
                                <option>List item</option>
                                <option>Single image</option>
                                <option>Text editor</option>
                            </select>
                        </div>

                        {/* Rank */}
                        <div className="mb-3">
                            <label className="block text-sm text-Text-100">Section Rank</label>
                            <input
                                placeholder="Type here"
                                type="number"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-secondary"
                            />
                        </div>

                        {/* Show on Landing */}
                        <div className="flex items-center gap-2 mb-3">
                            <label className="text-sm text-Text-100">
                                Show on Landing Page
                            </label>
                            <input
                                type="checkbox"
                                checked={showOnLanding}
                                onChange={() => setShowOnLanding((prev) => !prev)}

                            />
                        </div>

                        {/* Conditional Content */}
                        {dataType === 'List item' && (
                            <div className="mb-3">
                                <label className="block text-sm text-Text-100 mb-1">
                                    List Items
                                </label>
                                {listItems.map((item, idx) => (
                                    <input
                                        key={idx}
                                        value={item}
                                        onChange={(e) => handleListChange(e.target.value, idx)}
                                        className="mb-2 w-full border border-gray-300 rounded-md px-3 py-2"
                                        placeholder={`Item ${idx + 1}`}
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setListItems([...listItems, ''])}
                                    className="text-sm mt-1 text-primary"
                                >
                                    + Add Item
                                </button>
                            </div>
                        )}

                        {dataType === 'Text editor' && (
                            <div className="my-3">
                                <TextEditor />
                            </div>
                        )}

                        {dataType === 'Single image' && (
                            <div className="mb-3">


                                {imagePreview ? (
                                    <div className={"flex mt-3 gap-2 h-[300px]"}>
                                        <Image
                                            src={imagePreview}
                                            alt="preview"
                                            width={300}
                                            height={300}
                                            className=" rounded-md border"
                                        />

                                        <div className={"relative h-full w-full bg-neutral-50 flex items-center justify-center "} >
                                            <div>
                                                <MdFileUpload className={"text-3xl text-primary mx-auto mb-1"} />
                                                <h1 className={"text-Text-100 text-sm"}>upload Image</h1>
                                            </div>
                                            <input
                                                className={'opacity-0 absolute top-0 h-full  w-full'}
                                                type="file" accept={'image/*'}
                                                onChange={handleImageUpload}
                                            />
                                        </div>


                                    </div>

                                ) : (
                                    <div className={"relative h-40 w-full bg-neutral-50 flex items-center justify-center "} >
                                        <div>
                                            <MdFileUpload className={"text-3xl text-primary mx-auto mb-1"} />
                                            <h1 className={"text-Text-100 text-sm"}>upload Image</h1>
                                        </div>
                                        <input
                                            className={'opacity-0 absolute top-0 h-full  w-full'} type="file"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                )
                                }
                            </div>
                        )}

                        {/* Actions */}
                        <div className="text-end space-x-3 mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium"
                            >
                                Create Section
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    resetForm();
                                }}
                                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
