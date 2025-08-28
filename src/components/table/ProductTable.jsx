"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPreview } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";
import EditProduct from "../../modal/EditProduct";

const ProductTable = ({ filter, setSelectedIds }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const goToPage = (id) => {
    window.open(`/singlePage/${id}`);
  };

  const handleDelete = async (id) => {
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
      await API.delete("/products", { data: { id } });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleCheckbox = (id, checked) => {
    setSelectedIds((prev) => {
      if (checked) return [...prev, id];
      else return prev.filter((pid) => pid !== id);
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const filteredProducts = products
    .filter((p) => {
      if (filter === "landing") return p.showOnLanding === true;
      if (filter === "lowStock") return p.stock < 5;
      return true;
    })
    .sort((a, b) => {
      if (filter === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr className="hover:bg-text-75/10 bg-Shave text-Text-100 text-sm">
              <th className="px-2 py-3 text-left border-e border-Line"></th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Title
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Page Status
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Price
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Stock
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Image
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Actions
              </th>
            </tr>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-Line hover:bg-text-75/10 bg-Shave text-Text-100"
                >
                  <td className="px-4 py-1 border-e border-Line text-center">
                    <input
                      className="h-4 w-4 border border-Line rounded mx-auto"
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckbox(product._id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-2 border-e border-Line">{product.name}</td>
                  <td className="p-2 border-e border-Line">
                    {product.showOnLanding ? "True" : "False"}
                  </td>
                  <td className="p-2 border-e border-Line">${product.price}</td>
                  <td className="p-2 border-e border-Line">{product.stock}</td>
                  <td className="p-2 border-e border-Line">
                    <div className="w-[80px] h-[80px]">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-2 space-x-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-secondary"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-secondary cursor-pointer"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => goToPage(product._id)}
                        className="text-secondary cursor-pointer"
                      >
                        <MdPreview className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-text-50">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-back rounded-lg p-4 shadow border border-Line text-Text-100"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mb-2"
                />
              )}
              <div className="flex justify-between items-center gap-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-primary hover:text-secondary"
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-text-75">Price: ${product.price}</p>
              <p className="text-text-75">Stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-text-50">No products found</div>
        )}
      </div>

      {/* Edit Product Popup */}
      {isEditOpen && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          Close={setIsEditOpen}
          onUpdated={(updated) => {
            setProducts((prev) =>
              prev.map((p) => (p._id === updated._id ? updated : p))
            );
          }}
        />
      )}
    </>
  );
};

export default ProductTable;