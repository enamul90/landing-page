'use client'
import React from 'react';
import OrderTable from "@/components/table/OrderTable";


import { useParams } from 'next/navigation';

const OrderPage = () => {
    const params = useParams();
    const {subPage} = params;

    return (
        <div div className="lg:p-6 p-3 bg-gray-100 min-h-screen">

            {
                subPage === "new-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">New Order</h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "hold-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">Hold Order</h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "incomplete-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
                                    Incomplete Order
                                </h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "ongoing-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
                                    Ongoing Order
                                </h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "complete-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
                                    Complete Order
                                </h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "cancel-order" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
                                    Cancel Order
                                </h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }

            {
                subPage === "delivery-failed" &&  (
                    <>
                        <div className="gap-4  mb-6">
                            <div className={"h-full flex items-center justify-between"}>
                                <h2 className="lg:text-xl text-lg font-bold uppercase text-Text-100">
                                    Delivery Failed
                                </h2>
                                <h2 className="lg:text-lg font-semibold  text-secondary">
                                    20 Orders
                                </h2>
                            </div>
                        </div>
                        <OrderTable />
                    </>
                )
            }


        </div>
    );
};

export default OrderPage;