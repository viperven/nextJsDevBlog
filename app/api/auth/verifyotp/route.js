import { NextResponse } from "next/server";

import { connectDB } from "../../../lib/db";
import TempUser from "../../../lib/models/tempUser";
import { errorHandler } from "../../../lib/middleware/errorHandler";
import { validateVerifyOtp } from "../../../lib/validation/authValidation";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    validateVerifyOtp(email, otp);

    connectDB();
    const tempUser = await TempUser.findOne({ email });
    console.log(tempUser, "tempuser");

    if (!tempUser)
      return NextResponse.json(
        { message: "OTP expired, request again" },
        { status: 400 }
      );
    if (tempUser.otp !== otp)
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });

    // Mark email as verified
    tempUser.isVerified = true;
    tempUser.otpExpiresAt = new Date(Date.now());
    await tempUser.save();

    return NextResponse.json(
      { isSuccess: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err);
  }
}
