import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import CheckoutPart from "@/app/models/CheckoutPart";

// POST Create
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  console.log(body);
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

// PUT Update by ID
export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const { id } = body; // Expect the frontend to send { id: "...", ...updatedFields }

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  try {
    const updated = await CheckoutPart.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}