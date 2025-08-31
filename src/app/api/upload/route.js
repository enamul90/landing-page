import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uniqueName =
    Date.now() +
    "-" +
    Math.round(Math.random() * 1e9) +
    path.extname(file.name);

const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

fs.writeFileSync(path.join(uploadDir, uniqueName), buffer);

  return NextResponse.json({ filename: uniqueName });
}

export const config = {
  api: {
    bodyParser: false,
  },
};