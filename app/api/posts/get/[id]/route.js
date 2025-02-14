import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "../../../../lib/db";
import { userAuth } from "../../../../lib/middleware/auth";
import { errorHandler } from "../../../../lib/middleware/errorHandler";
import Posts from "../../../../lib/models/posts";

export async function GET(req, { params }) {
  try {
    await userAuth(req);

    // Wait for params to resolve properly
    const postId = params?.id;

    if (!postId) {
      return NextResponse.json(
        { isSuccess: false, message: "Post id is required" },
        { status: 400 }
      );
    }

    await connectDB(); // Ensure DB connection is established

    // for testeing Fetching the post using find
    // const postsss = await Posts.find({ _id: postId });
    // console.log("postsss", postsss);

    // Fetching the post using aggregate
    const post = await Posts.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) },
      },
      {
        $lookup: {
          from: "activities",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$postId"] },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "likes",
                foreignField: "_id",
                as: "likes",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userId",
              },
            },
            {
              $unwind: "$userId",
            },
            {
              $project: {
                _id: 1,
                content: 1,
                likes: { _id: 1, name: 1 },
                userId: { _id: 1, name: 1 },
                createdAt: 1,
              },
            },
          ],
          as: "activity",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $project: {
          _id: 1,
          content: 1,
          image: 1,
          likes: { _id: 1, name: 1 },
          userId: { _id: 1, name: 1 },
          activity: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!post.length) {
      return NextResponse.json(
        { isSuccess: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        isSuccess: true,
        message: "Post fetched successfully",
        apiData: post[0], // Return the first post document
      },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err);
  }
}
