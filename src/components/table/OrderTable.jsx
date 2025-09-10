"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MdOutlinePreview,
  MdArrowDropDown,
} from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruck,
  FaMoneyBillWave,
  FaBoxOpen,
  FaPalette,
  FaRuler,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const OrderTable = ({ orders = [], loading, setOrders, subPage }) => {
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
              {subPage !== "new-order" && (
                <th className="px-2 py-3 text-left border-e border-Line">
                  Admin Note
                </th>
              )}
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
                    <FaRegUserCircle size={18} />
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
                          src={`/uploads/${p.image}`}
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

                {subPage !== "new-order" && (
                  <td className="p-2 border-e border-Line">
                    <h5 className="font-normal text-Text-100 max-w-30">
                      {order.adminNote ||
                        "There are many variations of passages of Lorem"}
                    </h5>
                  </td>
                )}
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-[650px] max-w-full max-h-[90vh] overflow-y-auto animate-fadeIn border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaBoxOpen /> Order Preview
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white hover:text-red-200 text-2xl font-bold"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 space-y-1 border">
                  <p>
                    <span className="font-semibold">
                      <FaUser className="inline mr-2" /> Name:
                    </span>{" "}
                    {selectedOrder.name}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <FaPhoneAlt className="inline mr-2" /> Phone:
                    </span>{" "}
                    {selectedOrder.phone}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <FaMapMarkerAlt className="inline mr-2" /> Address:
                    </span>{" "}
                    {selectedOrder.address}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1 border text-right">
                  <p>
                    <span className="font-semibold">
                      <FaCalendarAlt className="inline mr-2" /> Date:
                    </span>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <FaTruck className="inline mr-2" /> Shipping:
                    </span>{" "}
                    {selectedOrder.shippingCost}TK
                  </p>
                  <p>
                    <span className="font-semibold">
                      <FaMoneyBillWave className="inline mr-2" /> Total:
                    </span>{" "}
                    {selectedOrder.totalAmount}TK
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                  <FaBoxOpen /> Products
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {selectedOrder.products.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 border rounded-2xl p-4 bg-white hover:shadow-md transition"
                    >
                      <img
                        src={`/uploads/${p.image}`}
                        alt={p.name}
                        className="w-20 h-20 rounded-xl object-cover border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-500 flex gap-3">
                          <span>
                            <FaPalette className="inline mr-1" /> {p.color}
                          </span>
                          <span>
                            <FaRuler className="inline mr-1" /> {p.size}
                          </span>
                        </p>
                        <div className="flex gap-4 mt-1 text-sm">
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium flex items-center gap-1">
                            <FaMoneyBillWave /> {p.sellPrice} TK
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium flex items-center gap-1">
                            <MdOutlineProductionQuantityLimits /> {p.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50">
              {/* Status Dropdown */}
              <div className="relative inline-block">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  disabled={statusLoading}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow hover:opacity-90 flex items-center gap-2"
                >
                  {statusLoading ? "Updating..." : "Change Status"}
                  <MdArrowDropDown className="text-lg" />
                </button>

                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => handleStatusChange("hold")}
                      disabled={statusLoading}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ⏸ Hold Order
                    </button>
                    <button
                      onClick={() => handleStatusChange("cancel")}
                      disabled={statusLoading}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                    >
                      ❌ Cancel Order
                    </button>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 transition"
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