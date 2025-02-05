import { NextResponse } from 'next/server';

import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Posts from '../../../../lib/models/posts';
import Activity from '../../../../lib/models/activity';

export async function POST(req, { params }) {
    try {
        const postId = params?.id;
        const { _id } = await userAuth();

        if (!postId) {
            return NextResponse.json({ isSuccess: false, message: "Post id is required" }, { status: 400 });
        }

        const post = await Posts.findById(postId);
        if (!post) {
            return NextResponse.json({ isSuccess: false, message: "Post not found" }, { status: 404 });
        }

        if (post.userId.toString() !== _id.toString()) {
            return NextResponse.json({ isSuccess: false, message: "Unauthorized" }, { status: 401 });
        }

        await Posts.findByIdAndDelete(postId);
        await Activity.deleteMany({ postId: postId });

        return NextResponse.json({ isSuccess: true, message: "post deleted sucessfully" }, { status: 200 });
    } catch (err) {
        return errorHandler(err);
    }
};
