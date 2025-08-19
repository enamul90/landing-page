
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = 'my_super_secret_token_key';

export async function POST(req) {
    const { email, password } = await req.json();

    await connectDB();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials', status: 401 } );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials', status: 401 } );
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        // set cookie using next/headers
        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ message: 'Login successful',status: 200 } );
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong',status: 500 } );
    }
}
