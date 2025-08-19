import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';


export async function POST(req) {
    const { email, password, name } = await req.json();


    const hashed = await bcrypt.hash(password, 10);

    const requestBody = {
        email,
        password: hashed,
        name,
    }

    await connectDB();

    try {
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'user already exists' }, );
        }

        await User.create(requestBody);

        return NextResponse.json({ success: true, message: 'User created successfully.' }, );
    }
    catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }

}
