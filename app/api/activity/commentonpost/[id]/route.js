import { NextResponse } from 'next/server';

import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Activity from '../../../../lib/models/activity';
import Posts from '../../../../lib/models/posts';

// comment on post
export async function POST(req, { params }) {
    try {
        const postId = params?.id;
        const { _id } = await userAuth();
        const { content } = await req.json();

        if (!postId) {
            return NextResponse
                .json({ isSuccess: false, message: "Post id is required" }, { status: 400 });
        }

        const post = await Posts.findById(postId);
        if (!post) {
            return NextResponse
                .json({ isSuccess: false, message: "Post not found" }, { status: 400 });
        }

        const activity = new Activity({ userId: _id, postId, content });
        await activity.save();

        return NextResponse.json({
            isSuccess: true,
            message: "Comment added successfully",
            apiData: activity,
        }, { status: 200 });


    } catch (err) {
        return errorHandler(err);
    }
};
