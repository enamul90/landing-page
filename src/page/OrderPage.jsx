"use client";
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/table/OrderTable";
import { useParams } from "next/navigation";
import API from "@/app/utils/axios";

const OrderPage = () => {
  const params = useParams();
  const { subPage } = params;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const titles = {
    "new-order": "New Order",
    "hold-order": "Hold Order",
    "incomplete-order": "Incomplete Order",
    "ongoing-order": "Ongoing Order",
    "complete-order": "Complete Order",
    "cancel-order": "Cancel Order",
    "delivery-failed": "Delivery Failed",
  };

  const statusMap = {
    "new-order": "new",
    "hold-order": "hold",
    "incomplete-order": "incomplete",
    "ongoing-order": "ongoing",
    "complete-order": "complete",
    "cancel-order": "cancel",
    "delivery-failed": "failed",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const status = statusMap[subPage] || "";
        const res = await API.get(`/orders?status=${status}`);
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [subPage]);

  return (
    <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">
      <div className="gap-4 mb-6">
        <div className="h-full flex items-center justify-between">
          <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
            {titles[subPage] || "Orders"}
          </h2>
          <h2 className="lg:text-lg font-semibold text-secondary">
            {orders.length} Orders
          </h2>
        </div>
      </div>

      <OrderTable orders={orders} loading={loading} setOrders={setOrders} />
    </div>
  );
};

export default OrderPage;