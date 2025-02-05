import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../lib/db";
import User from "../../../lib/models/user";
import TempUser from "../../../lib/models/tempUser";
import { errorHandler } from "../../../lib/middleware/errorHandler";
import { validteRegister } from "../../../lib/validation/authValidation";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        validteRegister(name, email, password);

        connectDB();
        const tempUser = await TempUser.findOne({ email });

        if (!tempUser || !tempUser.isVerified)
            return NextResponse.json({ message: "Email not verified" }, { status: 400 });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in users collection
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Delete temp user entry
        await TempUser.deleteOne({ email });

        NextResponse.json({ message: "Registration successful" }, { status: 200 });
    } catch (err) {
        return errorHandler(err)
    }
};