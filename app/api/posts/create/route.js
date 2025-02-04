import { NextResponse } from 'next/server';
import { connectDB } from "../../../lib/db";
import { userAuth } from '../../../lib/middleware/auth';
import { errorHandler } from '../../../lib/middleware/errorHandler';
import { validatePost } from '../../../lib/validation/postValidation';
import Posts from '../../../lib/models/posts';

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB is connected

    // Authenticate User
    const user = await userAuth(req);
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ isSuccess: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const { content, image } = await req.json();

    // Validate Post Data
    validatePost({ content, image });

    // Create new post
    const newPost = new Posts({ userId: user._id, content, image });
    const result = await newPost.save();

    return NextResponse.json({
      isSuccess: true,
      message: 'Post created successfully',
      apiData: result,
    });

  } catch (err) {
    console.error(err.message);
    // return NextResponse.json({ isSuccess: false, message: err.message }, { status: 400 });
    // errorHandler(err)
  }
}
