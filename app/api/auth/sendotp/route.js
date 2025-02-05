import { NextResponse } from "next/server";

import { connectDB } from "../../../lib/db";
import TempUser from "../../../lib/models/tempUser";
import User from "../../../lib/models/user";
import { errorHandler } from "../../../lib/middleware/errorHandler";
import { validateSendOtp } from "../../../lib/validation/authValidation";
import { sendOtpbyEmail } from "../../../lib/helper/emailService";

export async function POST(req) {
    try {
        const { name, email } = await req.json();

        validateSendOtp(name, email);
        connectDB();

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP in temp collection
        await TempUser.findOneAndUpdate(
            { email },
            {
                name,
                otp,
                isVerified: false,
                otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
            { upsert: true },
            { runValidators: true }
        );

        // Send OTP via email
        sendOtpbyEmail(email, otp);

        return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });
    } catch (err) {
        return errorHandler(err)
    }
};