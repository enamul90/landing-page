import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import MajorSection from "@/app/models/ConfigurePage/MajorSection";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let data = await MajorSection.findOne({});
    if (data) {
      data = await MajorSection.findByIdAndUpdate(data._id, body, {
        new: true,
      });
    } else {
      data = await MajorSection.create(body);
    }

    return NextResponse.json(
      { success: true, message: "Major Section Updated!", data },
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
