import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import MajorSection from "@/app/models/ConfigurePage/MajorSection";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // পুরনো ডাটা মুছে দিয়ে নতুন ডাটা save করবো
    await MajorSection.deleteMany({});
    const newSection = await MajorSection.create(body);

    return NextResponse.json(
      { success: true, message: "Major Section Updated!", data: newSection },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update Major Section", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const section = await MajorSection.findOne().sort({ createdAt: -1 });

    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch Major Section", error },
      { status: 500 }
    );
  }
}