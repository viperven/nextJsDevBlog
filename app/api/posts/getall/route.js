import { NextResponse } from 'next/server';

import { errorHandler } from '../../../lib/middleware/errorHandler';
import Posts from '../../../lib/models/posts';
import { connectDB } from "../../../lib/db";

export async function GET(req) {
    try {
        console.log(new URL(req.url));

        let { pageNumber, pageSize } = new URL(req.url);

        pageNumber = parseInt(pageNumber) || 1;
        pageSize = parseInt(pageSize) || 10;

        if (pageNumber < 1) pageNumber = 1;
        if (pageSize < 1) pageSize = 10;

        let skipPosts = (pageNumber - 1) * pageSize;

       await connectDB();
        const totalPosts = await Posts.countDocuments(); // Total post count
        const allPosts = await Posts.aggregate([
            { $lookup: { from: "activities", localField: "_id", foreignField: "postId", as: "activity" } },
            { $skip: skipPosts },
            { $limit: pageSize }
        ]);
        
       return NextResponse.json({
            isSuccess: true,
            message: "All posts fetched successfully",
            totalPages: Math.ceil(totalPosts / pageSize),
            currentPage: pageNumber,
            pageSize,
            totalPosts,
            apiData: allPosts,
        }, { status: 200 });

    } catch (err) {
        return errorHandler(err);
    }
};
