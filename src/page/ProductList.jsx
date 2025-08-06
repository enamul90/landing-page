'use client';

import {  FiTrash2, FiPlus } from 'react-icons/fi';
import ProductTable from "@/components/table/ProductTable";
import AddProduct from "@/modal/AddProduct";
import {useState} from "react";


export default function ProductList() {
    const [addProductPopup, setAddProductPopup] = useState(false);

    const addProduct = () => {
        setAddProductPopup(true);
    }

    return (
        <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">
            {
                addProductPopup &&   <AddProduct Close={setAddProductPopup} />
            }

            {/* Header */}
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 mb-6">
                <div className={"h-full flex items-center lg:col-span-3"}>
                    <h2 className="lg:text-xl text-lg font-semibold uppercase text-Text-100">Product List</h2>
                </div>
                <div className=" col-span-3 gap-3 grid grid-cols-2 md:grid-cols-4 lg:col-span-5  ">
                    <select
                        className=" col-span-2 md:col-span-2  px-4 w-full  py-2 border border-Line rounded-md bg-white text-lightText-100 focus:outline-none
                        focus:ring-1 focus:ring-primary transition
                        "
                    >
                        <option value="">Select Category</option>
                        <option value="landing">Landing Page Product</option>
                        <option value="latest">Latest Project</option>
                        <option value="lowStock">Low Stock</option>
                    </select>
                    <button
                        className=" col-span-1 flex text-xs lg:text-base items-center justify-center lg:px-4 py-2 px-3 w-full
                          bg-black text-text-100 rounded-lg text-white cursor-pointer "
                    >
                        <FiTrash2 className="w-5 h-5 mr-2" />
                        Delete
                    </button>
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
            <ProductTable />

        </div>
    );
}