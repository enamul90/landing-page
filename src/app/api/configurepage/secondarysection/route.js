import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import SecondarySection from "@/app/models/ConfigurePage/SecondarySection";

// 👉 POST: create section
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const section = await SecondarySection.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 👉 GET: fetch all sections
export async function GET() {
  try {
    await connectDB();
    const sections = await SecondarySection.find().sort({ rank: 1 });
    return NextResponse.json(sections);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 👉 DELETE: delete section by _id
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id"); // ?_id=xxxxx

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const section = await SecondarySection.findByIdAndDelete(id);
    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Section deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 👉 PUT: update section by _id
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updatedSection = await SecondarySection.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSection);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}