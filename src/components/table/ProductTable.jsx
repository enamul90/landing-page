import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import  {products} from "@/data/mainData"
import { MdPreview} from "react-icons/md";
import { FiEdit, FiTrash2,} from 'react-icons/fi';
import {useRouter} from "next/navigation";



const ProductTable = () => {
    const router = useRouter();
    const goToPage = (id) => {
        router.push(`/singlePage/111`);
    }
    return (
        <>
            {/* Table for Desktop */}
            <div className="hidden lg:block rounded-lg overflow-hidden">
                <table className="w-full ">
                    <tbody >
                    <tr className="hover:bg-text-75/10 bg-Shave text-Text-100 text-sm  ">
                        <th className="px-2 py-3 text-left border-e border-Line">
                        </th>
                        <th className="px-2 py-3 text-left border-e border-Line">Title</th>
                        <th className="px-2 py-3 text-left border-e border-Line">Page Status</th>
                        <th className="px-2 py-3 text-left border-e border-Line">Price</th>
                        <th className="px-2 py-3 text-left border-e border-Line">Stock</th>
                        <th className="px-2 py-3 text-left border-e border-Line">Image</th>
                        <th className="px-2 py-3 text-left border-e border-Line"> Actions</th>
                    </tr>

                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} className="border-t border-Line hover:bg-text-75/10 bg-Shave text-Text-100  " >
                                <td className="px-4 py-1 border-e border-Line text-center">
                                    <input
                                        className="h-4 w-4 border border-Line rounded  transition duration-200 mx-auto
                                        "
                                        type={"checkbox"}
                                    />
                                </td>
                                <td className="p-2 border-e border-Line">{product.name}</td>
                                <td className="p-2 border-e border-Line">
                                    <div className={"flex items-center gap-3 "}>
                                        True
                                    </div>
                                </td>
                                <td className="p-2 border-e border-Line">
                                    200
                                </td>
                                <td className="p-2 border-e border-Line">
                                    {product.stock}
                                </td>
                                <td className="p-2 border-e border-Line">
                                    <div className="w-[80px] h-[80px]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>

                                </td>
                                <td className="p-2 space-x-2 space-y-2 ">
                                    <div className={"flex gap-3 "}>
                                        <Link
                                            href={`/products/edit/${product.id}`}
                                            className="text-primary hover:text-secondary"
                                        >
                                            <FiEdit className="w-5 h-5" />
                                        </Link>
                                        <button className="text-secondary cursor-pointer">
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={goToPage } className="text-secondary cursor-pointer">
                                            <MdPreview className="w-5 h-5" />
                                        </button>
                                    </div>
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