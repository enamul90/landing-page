import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = "my_super_secret_token_key";

export async function POST(req) {
  await connectDB();

  try {
    const { oldPassword, newPassword } = await req.json();

    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Old password incorrect",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}