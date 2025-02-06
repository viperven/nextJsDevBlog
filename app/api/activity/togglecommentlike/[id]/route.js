import { NextResponse } from 'next/server';

import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Activity from '../../../../lib/models/activity';

//toggle comment like
export async function POST(req, { params }) {
    try {
        const commentId = params?.id;
        const { _id } = await userAuth();
        let message = "";

        if (!commentId) {
            return NextResponse.json({ isSuccess: false, message: "commentId is mandatory" }, { status: 400 });
        }

        const activity = await Activity.findById(commentId);
        if (!activity) {
            return NextResponse.json({ isSuccess: false, message: "Comment not found" }, { status: 404 });
        }

        const likeIndex = activity.likes.indexOf(_id);

        if (likeIndex === -1) {
            activity.likes.push(_id);
            message = "Comment liked successfully";
        } else {
            activity.likes.splice(likeIndex, 1);
            message = "Like removed from comment";
        }

        await activity.save();

        return NextResponse.json({
            isSuccess: true,
            message,
            apiData: activity,
        }, { status: 200 });
    } catch (err) {
        return errorHandler(err);
    }
};
