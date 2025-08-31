import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Order from "@/app/models/Order";
import { getAuthUser } from "@/app/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const orders = await Order.create(body);
    return NextResponse.json(orders, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // status query parameter

    const user = getAuthUser();

    if (!user) return NextResponse.json({ error: "Unauthorized" });

    const query = status ? { status } : {}; // যদি status থাকে শুধু সেই status filter করবে
    const orders = await Order.find(query);

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("PUT request body:", body);
    const updatedOrder = await Order.findByIdAndUpdate(
      body._id,
      { status: body.status },
      { new: true }
    );
    console.log("Updated order:", updatedOrder);
    if (!updatedOrder)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    console.log("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
