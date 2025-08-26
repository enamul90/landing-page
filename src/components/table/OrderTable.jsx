import React from "react";
import Image from "next/image";

import Link from "next/link";
import { products } from "@/data/mainData";
import { MdOutlinePreview } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const OrderTable = ({ orders = [], loading }) => {
  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found</p>;
  return (
    <>
      {/* Table for Desktop */}
      <div className="hidden lg:block  ">
        <table className="w-full border border-Line rounded-md ">
          <tbody>
            <tr className="hover:bg-text-75/10 bg-Shave text-Text-100 text-sm  ">
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
                {" "}
                Courier
              </th>
              <th className="px-2 py-3 text-left border-e border-Line">
                Admin Note
              </th>
            </tr>

            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-Line hover:bg-text-75/10 bg-Shave text-Text-100 text-sm "
                >
                  <td className="px-4 py-1 border-e border-Line">
                    <input
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-offset-1
                                         focus:ring-primary transition duration-200 mx-auto
                                        "
                      type={"checkbox"}
                    />
                  </td>

                  <td className="px-2 py-1 space-x-2  h-full text-Text-75 border-e border-Line ">
                    <button className="cursor-pointer">
                      <MdOutlinePreview size={18} />
                    </button>
                    <button className=" cursor-pointer">
                      <FaRegEdit size={18} />
                    </button>
                  </td>

                  <td className="px-2 py-2 border-e border-Line">
                    <h4>{new Date(order.createdAt).toLocaleString()}</h4>
                    <h5 className={"text-Text-75"}>
                      Approved by : Enamul Hossen
                    </h5>
                  </td>
                  <td className="px-2 py-1 border-e border-Line">
                    <h5 className={"text-secondary font-medium"}>
                      {" "}
                      {order.name}
                    </h5>
                    <h5> {order.phone}</h5>
                    <h5 className={"text-xs text-Text-75"}>
                      {" "}
                      {order.address}{" "}
                    </h5>
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

                  <td className="p-2  border-e border-Line">
                    {order.products.map((p) => (
                      <h5 key={p._id} className={"font-medium text-Text-75"}>
                        Total :{" "}
                        <span className={"font-normal text-Text-100"}>
                          {p.sellPrice}
                        </span>
                      </h5>
                    ))}
                    <h5 className={"font-medium text-Text-75"}>
                      D - Charge :{" "}
                      <span className={"font-normal text-Text-100"}>
                        {order.shippingCost}
                      </span>
                    </h5>

                    <h5 className={"font-medium text-Text-75"}>
                      Sub Total :{" "}
                      <span className={"font-normal text-Text-100"}>
                        {order.totalAmount}
                      </span>
                    </h5>
                  </td>
                  <td className="p-2  border-e border-Line">
                    {order.products.map((p) => (
                      <h5 key={p._id} className={"font-medium text-Text-75"}>
                        Total :{" "}
                        <span className={"font-normal text-Text-100"}>
                          {p.sellPrice}
                        </span>
                      </h5>
                    ))}
                    <h5 className={"font-medium text-Text-75"}>
                      D - Charge :{" "}
                      <span className={"font-normal text-Text-100"}>
                        {order.shippingCost}
                      </span>
                    </h5>

                    <h5 className={"font-medium text-Text-75"}>
                      Sub Total :{" "}
                      <span className={"font-normal text-Text-100"}>
                        {order.totalAmount}
                      </span>
                    </h5>
                  </td>
                  <td className="px-2 py-1 border-e border-Line">
                    <h5 className={"font-normal text-Text-100 max-w-30"}>
                      There are many variations of passages of Lorem
                    </h5>
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
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-back rounded-lg p-4 shadow border border-Line text-Text-100"
            >
              {order.products.map((p) => (
                <img
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
          ))
        ) : (
          <div className="text-center text-text-50">No products found</div>
        )}
      </div>
    </>
  );
};

export default OrderTable;
