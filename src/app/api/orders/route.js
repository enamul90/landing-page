import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";
import Order from "@/app/models/Order";

export async function POST(req) {
  await connectDB();
  // const user = getAuthUser();

  // if (!user) return NextResponse.json({ error: "Unauthorized" });

  const body = await req.json();

  const order = new Order(body);
  await order.save();

  return Response.json(order, { status: 201 });
}

export async function GET(req) {
  await connectDB();
  // const user = getAuthUser();

  // if (!user) return NextResponse.json({ error: "Unauthorized" });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });

  return Response.json(orders);
}
