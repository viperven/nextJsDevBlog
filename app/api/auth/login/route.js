import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "../../../lib/db";
import User from "../../../lib/models/user";
import { errorHandler } from "../../../lib/middleware/errorHandler";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) return NextResponse.json({ message: "Please enter all fields" }, { status: 400 });

        await connectDB();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        cookies().set("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        return NextResponse.json({ message: "logged in successfully", apiData: token }, { status: 200 });
    } catch (err) {
        return errorHandler(err)
    }
};