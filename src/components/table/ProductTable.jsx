import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import  {products} from "@/data/mainData"
import {MdPreview} from "react-icons/md";
import { FiEdit, FiTrash2,} from 'react-icons/fi';
import SwitchToggle from "@/components/button/SwitchToggle";

const ProductTable = () => {
    return (
        <>
            {/* Table for Desktop */}
            <div className="hidden lg:block bg-black/90 rounded-lg overflow-hidden">
                <table className="w-full text-white">
                    <thead>
                    <tr className=" text-text-100 uppercase">
                        <th className="p-4 text-left">
                            <input
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-offset-1
                                         focus:ring-primary transition duration-200 mx-auto
                                        "
                                type={"checkbox"}
                            />
                        </th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Show landing page</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Sell Price</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-left">Color</th>
                        <th className="p-4 text-left">Size</th>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody >
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} className="border-t border-Line hover:bg-text-75/10 bg-Shave text-Text-100  " >

                                <td className="p-4">
                                    <input
                                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-offset-1
                                         focus:ring-primary transition duration-200 mx-auto
                                        "
                                        type={"checkbox"}
                                    />
                                </td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">
                                    <SwitchToggle />
                                </td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4">{"Black , Red, "}</td>
                                <td className="p-4 lowercase">{"lg , md, Xl, 2xl, 3xl "}</td>
                                <td className="p    -4">
                                    <div className="w-[70px] h-[50px]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>

                                </td>
                                <td className="p-4 flex items-center space-x-2 pt-7 ">
                                    <Link
                                        href={`/products/edit/${product.id}`}
                                        className="text-primary hover:text-secondary"
                                    >
                                        <FiEdit className="w-5 h-5" />
                                    </Link>
                                    <button className="text-secondary cursor-pointer">
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                    <button className="text-secondary cursor-pointer">
                                        <MdPreview className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-4 text-center text-text-50">
                                No products found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>


            {/* Card Layout for Mobile */}
            <div className="lg:hidden space-y-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="bg-back rounded-lg p-4 shadow border border-Line text-Text-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded mb-2"
                            />
                            <div className="flex justify-between items-center gap-1">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/products/edit/${product.id}`}
                                        className="text-primary hover:text-secondary"
                                    >
                                        <FiEdit className="w-5 h-5" />
                                    </Link>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-text-75">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-text-75">Stock: {product.stock}</p>
                            <p className="text-text-75">Category: {product.category}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-text-50">No products found</div>
                )}
            </div>
        </>
    );
};

export default ProductTable;