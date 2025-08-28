"use client";

import { FiTrash2, FiPlus } from "react-icons/fi";
import ProductTable from "@/components/table/ProductTable";
import AddProduct from "@/modal/AddProduct";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "@/app/utils/axios";

export default function ProductList() {
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      toast.error("No product selected!");
      return;
    }

    const confirmDelete = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <span>Are you sure you want to delete this product?</span>
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => {
                  resolve(true);
                  toast.dismiss(t.id);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  resolve(false);
                  toast.dismiss(t.id);
                }}
                className="px-3 py-1 bg-gray-300 text-black rounded"
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: Infinity, position: "top-center" }
      );
    });

    if (!confirmDelete) return;

    try {
      await API.delete("/products", { data: { id: selectedIds } });
      toast.success("Selected products deleted successfully!");
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete products");
    }
  };

  const addProduct = () => {
    setAddProductPopup(true);
  };

  return (
    <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">
      {addProductPopup && <AddProduct Close={setAddProductPopup} />}

      {/* Header */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 mb-6">
        <div className={"h-full flex items-center lg:col-span-3"}>
          <h2 className="lg:text-xl text-lg font-semibold uppercase text-Text-100">
            Product List
          </h2>
        </div>
        <div className=" col-span-3 gap-3 grid grid-cols-2 md:grid-cols-4 lg:col-span-5  ">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className=" col-span-2 md:col-span-2  px-4 w-full  py-2 border border-Line rounded-md bg-white text-lightText-100 focus:outline-none
                        focus:ring-1 focus:ring-primary transition
                        "
          >
            <option value="">Select Category</option>
            <option value="landing">Landing Page Product</option>
            <option value="latest">Latest Project</option>
            <option value="lowStock">Low Stock</option>
          </select>
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className=" col-span-1 flex text-xs lg:text-base items-center justify-center lg:px-4 py-2 px-3 w-full
                          bg-black text-text-100 rounded-lg text-white cursor-pointer "
            >
              <FiTrash2 className="w-5 h-5 mr-2" />
              Delete
            </button>
          )}
          <button
            onClick={addProduct}
            className=" flex text-xs lg:text-base items-center justify-center  lg:px-4 py-2 px-3  w-full  bg-secondary
                        text-text-100 rounded-lg text-white cursor-pointer"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Table for Desktop */}
      <ProductTable filter={filter} setSelectedIds={setSelectedIds} />
    </div>
  );
}
