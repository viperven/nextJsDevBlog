import jwt from 'jsonwebtoken';
import User from '../models/user';
import { cookies } from 'next/headers';
import { connectDB } from '../db';

export const userAuth = async () => {
    try {
        // const header = req.headers.get("authorization");
        // if (!header) {
        //   return NextResponse.json({ isSuccess: false, message: "No token provided" }, { status: 401 });
        // }

        // const token = header.split(" ").pop(); // Extract token

        const cookieStore = cookies();  // Extract cookies from the headers.
        const token = await cookieStore.get('token')?.value;  // Await cookies().get()

        if (!token) throw new Error('Please login !');
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        await connectDB();

        const user = await User.findById(decodeToken._id);
        if (!user) throw new Error('User not found!');

        return user; // Return user object for use in API
    } catch (err) {
        console.error(err.stack);
        // return null;
        throw new Error("please login ! token expired: " + err.message)
    }
};
