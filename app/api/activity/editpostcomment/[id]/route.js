import { NextResponse } from 'next/server';

import { userAuth } from '../../../../lib/middleware/auth';
import { errorHandler } from '../../../../lib/middleware/errorHandler';
import Activity from '../../../../lib/models/activity';

//edit comment of post
export async function POST(req, { params }) {
    try {
        const commentId = params?.id;
        const { content } = await req.json();

        const { _id } = await userAuth();
        const activity = await Activity.findById(commentId);

        if (!activity) {
            return NextResponse
                .json({ isSuccess: false, message: "Comment not found" }, { status: 404 });
        }

        if (activity.userId.toString() !== _id.toString()) {
            return NextResponse

                .json({ isSuccess: false, message: "You are not authorized" }, { status: 401 });
        }

        activity.content = content;
        await activity.save();

        return NextResponse.json({
            isSuccess: true,
            message: "Comment edited successfully",
            apiData: activity,
        }, { status: 200 });

    } catch (err) {
        return errorHandler(err);
    }
};
