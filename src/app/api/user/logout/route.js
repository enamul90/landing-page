import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        // Remove token cookie
        cookies().set({
            name: "token",
            value: "",
            httpOnly: true,
            path: "/",
            expires: new Date(0), // Expire immediately
        });

        return NextResponse.json({ message: "Logout successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
