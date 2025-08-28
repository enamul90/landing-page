import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Order from "@/app/models/Order";

export async function POST(req) {
try {
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
    const orders = await Order.find({});
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
