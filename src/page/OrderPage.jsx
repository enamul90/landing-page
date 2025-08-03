'use client';

import React from 'react';

import ProductTable from "@/components/table/ProductTable";



export default function OrderPage() {


    return (
        <div className="lg:p-6 p-3 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="mb-6">
                <div className={"h-full flex items-center lg:col-span-3"}>
                    <h2 className="lg:text-xl text-lg font-semibold uppercase text-Text-100">New Order List</h2>
                </div>

            </div>

            <ProductTable />
        </div>
    );
}