import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from "../../../../lib/db";
import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Posts from '../../../../lib/models/posts';

export async function POST(req, { params }) {
    try {
        const { content, image } = await req.json();
        const { _id } = await userAuth(req);
        const postId = params?.id;

        if (!postId) {
            console.log("why");

            return NextResponse
                .json({ isSuccess: false, message: "Post id is required" }, { status: 400 });
        }

        const post = await Posts.findById(postId);
        if (!post) {
            return NextResponse

                .json({ isSuccess: false, message: "Post not found" }, { status: 400 });
        }

        if (post.userId.toString() !== _id.toString()) {
            return NextResponse

                .json({ isSuccess: false, message: "Unauthorized" }, { status: 400 });
        }

        const result = await Posts.findByIdAndUpdate(
            postId,
            { content, image },
            { new: true }
        );

        return NextResponse.json({
            isSuccess: true,
            message: "Post updated successfully",
            apiData: result,
        }, { status: 200 });

    } catch (err) {
        return errorHandler(err);
    }
};
