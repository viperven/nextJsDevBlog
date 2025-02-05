import { NextResponse } from 'next/server';

import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Posts from '../../../../lib/models/posts';


export async function POST(req, { params }) {
    try {


        const postId = params?.id;
        const { _id } = await userAuth();
        let message = "";

        if (!postId) {
            return NextResponse

                .json({ isSuccess: false, message: "Post id is required" }, { status: 400 });
        }

        const post = await Posts.findById(postId);
        if (!post) {
            return NextResponse

                .json({ isSuccess: false, message: "Post not found" }, { status: 404 });
        }

        let postLike = post.likes.indexOf(_id);

        if (postLike === -1) {
            postLike = post.likes.push(_id);
            message = "Post liked successfully";
        } else {
            postLike = post.likes.splice(postLike, 1);
            message = "Post unliked successfully";
        }

        await post.save();

       return NextResponse.json({
            isSuccess: true,
            message,
            apiData: post,
        }, { status: 200 });
    } catch (err) {
        return errorHandler(err);
    }
};
