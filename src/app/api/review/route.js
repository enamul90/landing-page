import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Review from "@/app/models/Review";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const review = new Review({ image: body.image });
    await review.save();
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview)
      return NextResponse.json({ error: "Review not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}