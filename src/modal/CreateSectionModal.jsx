"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import TextEditor from "@/components/textEditor/TextEditor";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

export default function CreateSectionModal({ onSave, editData, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  // form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [dataType, setDataType] = useState("List item");
  const [rank, setRank] = useState("");
  const [showOnLanding, setShowOnLanding] = useState(true);
  const [listItems, setListItems] = useState([""]);
  const [htmlContent, setHtmlContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // edit mode হলে prefill হবে
  useEffect(() => {
    if (editData) {
      setIsOpen(true);
      setTitle(editData.title || "");
      setSubtitle(editData.subtitle || "");
      setDataType(
        editData.contentType === "list"
          ? "List item"
          : editData.contentType === "image"
          ? "Single image"
          : "Text editor"
      );
      setRank(editData.rank || "");
      setShowOnLanding(editData.showOnLanding ?? true);
      setListItems(editData.contentType === "list" ? editData.content : [""]);
      setHtmlContent(editData.contentType === "html" ? editData.content : "");
      setImagePreview(
        editData.contentType === "image" ? editData.content : null
      );
    }
  }, [editData]);

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDataType("List item");
    setRank("");
    setShowOnLanding(true);
    setListItems([""]);
    setHtmlContent("");
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

  const handleSubmit = async () => {
    const payload = {
      _id: editData?._id,
      title,
      subtitle,
      type: dataType,
      rank,
      showOnLanding,
      contentType:
        dataType === "List item"
          ? "list"
          : dataType === "Single image"
          ? "image"
          : "html",
      content:
        dataType === "List item"
          ? listItems
          : dataType === "Single image"
          ? imagePreview
          : htmlContent,
    };

    try {
      if (editData) {
        // Update
        const res = await API.put("/configurepage/secondarysection", payload);
        toast.success("✅ Section updated successfully!");
        onSave && onSave(res.data);
      } else {
        // Create
        const res = await API.post("/configurepage/secondarysection", payload);
        toast.success("✅ Section created successfully!");
        onSave && onSave(res.data);
      }

      resetForm();
      setIsOpen(false);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save section");
    }
  };

  return (
    <>
      {!editData && (
        <div className="text-end">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Create Section
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsOpen(false);
                resetForm();
                onClose?.();
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editData ? "Edit Section" : "Create Section"}
            </h2>

            {/* Title */}
            <div className="mb-3">
              <label className="block text-sm">Section Title</label>
              <input
                placeholder="Type here"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Subtitle */}
            <div className="mb-3">
              <label className="block text-sm">Section Subtitle</label>
              <input
                placeholder="Type here"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Data Type */}
            <div className="mb-3">
              <label className="block text-sm">Data Type</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option>List item</option>
                <option>Single image</option>
                <option>Text editor</option>
              </select>
            </div>

            {/* Rank */}
            <div className="mb-3">
              <label className="block text-sm">Section Rank</label>
              <input
                placeholder="Type here"
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Show on Landing */}
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm">Show on Landing Page</label>
              <input
                type="checkbox"
                checked={showOnLanding}
                onChange={() => setShowOnLanding((prev) => !prev)}
              />
            </div>

            {/* Conditional Content */}
            {dataType === "List item" && (
              <div className="mb-3">
                <label className="block text-sm mb-1">List Items</label>
                {listItems.map((item, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                      value={item}
                      onChange={(e) => handleListChange(e.target.value, idx)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder={`Item ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...listItems];
                        updated.splice(idx, 1);
                        setListItems(updated);
                      }}
                      className="ml-2 text-red-500 font-bold px-2 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setListItems([...listItems, ""])}
                  className="text-sm mt-1 text-primary"
                >
                  + Add Item
                </button>
              </div>
            )}

            {dataType === "Text editor" && (
              <div className="my-3">
                <TextEditor value={htmlContent} onChange={setHtmlContent} />
              </div>
            )}

            {dataType === "Single image" && (
              <div className="mb-3">
                {imagePreview ? (
                  <div className="flex mt-3 gap-2 h-[300px]">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={300}
                      height={300}
                      className="rounded-md border"
                    />
                  </div>
                ) : (
                  <div className="relative h-40 w-full bg-neutral-50 flex items-center justify-center">
                    <div>
                      <MdFileUpload className="text-3xl mx-auto mb-1" />
                      <h1 className="text-sm">Upload Image</h1>
                    </div>
                    <input
                      className="opacity-0 absolute top-0 h-full w-full"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="text-end space-x-3 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                {editData ? "Update Section" : "Create Section"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                  onClose?.();
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