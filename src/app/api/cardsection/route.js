import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import CardSection from "@/app/models/CardSection";

// POST Create
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  await CardSection.deleteMany({});
  const data = await CardSection.create(body);
  return NextResponse.json(data, { status: 201 });
}

// GET All
export async function GET() {
  await connectDB();
  const data = await CardSection.find({});
  return NextResponse.json(data);
}