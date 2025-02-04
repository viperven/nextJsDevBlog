import jwt from 'jsonwebtoken';
import User from '../models/user';
import { cookies } from 'next/headers';

export const userAuth = async (req) => {
    try {
        // const header = req.headers.get("authorization");
        // if (!header) {
        //   return NextResponse.json({ isSuccess: false, message: "No token provided" }, { status: 401 });
        // }

        // const token = header.split(" ").pop(); // Extract token
        console.log("hey.........",process.env.JWT_SECRET);
        console.log(cookies().get('token'));

        const token = cookies().get('token')?.value;
        if (!token) throw new Error('Please loginhjjkhkjhhjkhkjhjh!');

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken.id);

        if (!user) throw new Error('User not found!');

        return user; // Return user object for use in API
    } catch (err) {
        console.error(err.message);
        // return null;
        throw new Error("please login ! token expired: " + err.message)
    }
};
