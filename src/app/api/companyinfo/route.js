import { connectDB } from "@/app/lib/db";
import CompanyInfo from "@/app/models/CompanyInfo.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

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

    let company = await CompanyInfo.findOne();
    if (company) {
      company.logo = data.logo;
      company.pageName = data.pageName;
      company.copyRight = data.copyRight;
      company.description = data.description;
      company.mobileNumber = data.mobileNumber;
      company.whatsappNumber = data.whatsappNumber;
      company.socialLink = data.socialLink;

      await company.save();
      return NextResponse.json(company, { status: 200 });
    } else {
      const newCompany = await CompanyInfo.create(data);
      return NextResponse.json(newCompany, { status: 201 });
    }
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