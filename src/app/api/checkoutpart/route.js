import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import CheckoutPart from "@/app/models/CheckoutPart";

// POST Create
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  await CheckoutPart.deleteMany({});
  const data = await CheckoutPart.create(body);
  return NextResponse.json(data, { status: 201 });
}

// GET All
export async function GET() {
  await connectDB();
  const data = await CheckoutPart.find({});
  return NextResponse.json(data);
}