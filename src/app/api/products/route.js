import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { getAuthUser } from "@/app/lib/auth";
import Product from "@/app/models/Product";

// Connect to DB
connectDB();

// ✅ Create Product
export async function POST(req) {
  try {
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// ✅ Get All Products
export async function GET() {
  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Update Product by ID
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...data } = body; // expect id inside body

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// ✅ Delete Product by ID
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}