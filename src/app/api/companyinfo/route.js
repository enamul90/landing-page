import { connectDB } from "@/app/lib/db";
import CompanyInfo from "@/app/models/CompanyInfo.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // simple validation
    const requiredFields = [
      "logo",
      "pageName",
      "copyRight",
      "description",
      "mobileNumber",
      "whatsappNumber",
      "socialLink",
    ];
    for (let field of requiredFields) {
      if (
        !data[field] ||
        (Array.isArray(data[field]) && data[field].length === 0)
      ) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // check duplicate pageName
    const exists = await CompanyInfo.findOne({ pageName: data.pageName });
    await CompanyInfo.deleteMany({});
    if (exists) {
      return NextResponse.json(
        { error: "Page Name already exists" },
        { status: 400 }
      );
    }

    const newCompany = await CompanyInfo.create(data);
    return NextResponse.json(newCompany, { status: 201 });
  } catch (err) {
    console.error("Error in /api/companyinfo POST:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const data = await CompanyInfo.find().sort({ createdAt: -1 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}