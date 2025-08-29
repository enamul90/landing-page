"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePreview, MdArrowDropDown } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const OrderTable = ({ orders = [], loading, setOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found</p>;

  const handleStatusChange = async (status) => {
    if (!selectedOrder) return;

    try {
      setStatusLoading(true);
      const { data } = await API.put(`/orders`, {
        _id: selectedOrder._id,
        status,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === data._id ? { ...o, status: data.status } : o
        )
      );

      toast.success(`Order set to ${status}`);

      setSelectedOrder(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setStatusLoading(false);
      setShowDropdown(false);
    }
  };

  return (
    <>
      {/* Table for Desktop */}
      <div className="hidden lg:block">
        <table className="w-full border border-Line rounded-md">
          <tbody>
            <tr className="hover:bg-text-75/10 bg-Shave text-Text-100 text-sm">
              <th className="px-2 py-3 text-left border-e border-Line"></th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Action
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Activity
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Customer info
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Product
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Amount
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Courier
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Admin Note
              </th>
            </tr>

            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-Line hover:bg-text-75/10 bg-Shave text-Text-100 text-sm"
              >
                <td className="px-4 py-1 border-e border-Line">
                  <input
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-offset-1 focus:ring-primary transition duration-200 mx-auto"
                    type="checkbox"
                  />
                </td>

                <td className="px-2 py-1 space-x-2 h-full text-Text-75 border-e border-Line">
                  <button
                    className="cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <MdOutlinePreview size={18} />
                  </button>
                  <button className="cursor-pointer">
                    <FaRegEdit size={18} />
                  </button>
                </td>

                <td className="px-2 py-2 border-e border-Line">
                  <h4>{new Date(order.createdAt).toLocaleString()}</h4>
                  <h5 className="text-Text-75">Approved by : Enamul Hossen</h5>
                </td>

                <td className="px-2 py-1 border-e border-Line">
                  <h5 className="text-secondary font-medium">{order.name}</h5>
                  <h5>{order.phone}</h5>
                  <h5 className="text-xs text-Text-75">{order.address}</h5>
                </td>

                <td className="p-2 border-e border-Line">
                  {order.products.map((p) => (
                    <div key={p._id} className="flex gap-3 mb-2">
                      <div className="h-20 w-18 shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover object-center rounded-md"
                        />
                      </div>
                      <div className="w-36 h-20 overflow-auto">
                        <h5>{p.name}</h5>
                        <h5 className="font-medium text-Text-75">
                          Color :{" "}
                          <span className="font-normal text-Text-100">
                            {p.color}
                          </span>
                        </h5>
                        <h5 className="font-medium text-Text-75">
                          Size :{" "}
                          <span className="font-normal text-Text-100">
                            {p.size}
                          </span>
                        </h5>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="p-2 border-e border-Line">
                  {order.products.map((p) => (
                    <h5 key={p._id} className="font-medium text-Text-75">
                      Total :{" "}
                      <span className="font-normal text-Text-100">
                        {p.sellPrice}TK
                      </span>
                    </h5>
                  ))}
                  <h5 className="font-medium text-Text-75">
                    D - Charge :{" "}
                    <span className="font-normal text-Text-100">
                      {order.shippingCost}TK
                    </span>
                  </h5>
                  <h5 className="font-medium text-Text-75">
                    Sub Total :{" "}
                    <span className="font-normal text-Text-100">
                      {order.totalAmount}TK
                    </span>
                  </h5>
                </td>

                <td className="p-2 border-e border-Line">
                  {order.products.map((p) => (
                    <h5 key={p._id} className="font-medium text-Text-75">
                      Total :{" "}
                      <span className="font-normal text-Text-100">
                        {p.sellPrice}TK
                      </span>
                    </h5>
                  ))}
                  <h5 className="font-medium text-Text-75">
                    D - Charge :{" "}
                    <span className="font-normal text-Text-100">
                      {order.shippingCost}TK
                    </span>
                  </h5>
                  <h5 className="font-medium text-Text-75">
                    Sub Total :{" "}
                    <span className="font-normal text-Text-100">
                      {order.totalAmount}TK
                    </span>
                  </h5>
                </td>

                <td className="p-2 border-e border-Line">
                  <h5 className="font-normal text-Text-100 max-w-30">
                    There are many variations of passages of Lorem
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-back rounded-lg p-4 shadow border border-Line text-Text-100"
          >
            {order.products.map((p) => (
              <img
                key={p._id}
                src={p.image}
                alt={p.name}
                className="w-16 h-16 object-cover rounded mb-2"
              />
            ))}
            <div className="flex justify-between items-center gap-1">
              <h3 className="text-lg font-semibold">{order.name}</h3>
              <div className="flex space-x-2">
                <Link
                  href={`/products/edit/${order._id}`}
                  className="text-primary hover:text-secondary"
                >
                  <FiEdit className="w-5 h-5" />
                </Link>
                <button className="text-red-500 hover:text-red-700">
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {order.products.map((p) => (
              <p key={p._id} className="text-text-75">
                Price: ${p.sellPrice}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* ==== Preview Modal ==== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl w-[600px] max-w-full p-6 relative animate-fadeIn overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Preview
              </h2>
              <button
                className="text-red-500 hover:text-red-700 text-xl"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedOrder.name}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedOrder.phone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedOrder.address}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Shipping:</span>{" "}
                  {selectedOrder.shippingCost}TK
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {selectedOrder.totalAmount}TK
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Products:</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {selectedOrder.products.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        Color: {p.color} | Size: {p.size}
                      </p>
                      <p className="text-sm font-semibold">
                        Price: {p.sellPrice} TK
                      </p>
                      <p className="text-sm font-semibold">
                        Quantity: {p.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              {/* Status Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  className="px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 font-medium hover:bg-gray-200 focus:outline-none flex items-center gap-3"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  disabled={statusLoading}
                >
                  <div>{statusLoading ? "Updating..." : "Change Status"}</div>
                  <MdArrowDropDown className="text-xl" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleStatusChange("hold")}
                      disabled={statusLoading}
                    >
                      Hold Order
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                      onClick={() => handleStatusChange("cancel")}
                      disabled={statusLoading}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;