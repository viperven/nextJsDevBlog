"use client";

import { ThumbsUp } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../lib/contexts/AuthContext";
import { BaseUrl } from "../lib/url";
import { useParams } from "next/navigation";

const CommentSection = ({ likes, comments, fetchPost }) => {
  const { user, setUser } = useContext(AuthContext);
  const params = useParams();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const res = await fetch(`${BaseUrl}activity/commentonpost/${params?.id}`,
        { method: "POST", body: JSON.stringify({ content: newComment }) })
      const data = await res.json();
      if (data?.isSuccess) {
        setNewComment("");
        fetchPost();
        // alert("sucessfully added comment");
      }
      else {
        alert("something went wrong try again")
      }
    }
  };


  const handleToogleCommentLike = async () => {
    try {
      const res = await fetch(`${BaseUrl}activity/togglecommentlike/${params?.id}`,
        { method: "POST" })
      const data = await res.json();
      if (data?.isSuccess) {
        setNewComment("");
        fetchPost();
        // alert("sucessfully added comment");
      }
      else {
        alert("something went wrong try again")
      }
    }
    catch (err) {

      console.log(err?.message);

    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 mb-8">
        {comments?.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                {comment.userId.name || "rupesh"}
              </span>
              <ThumbsUp style={{ cursor: "pointer" }} onClick={handleToogleCommentLike} />
              {/* <span className="text-sm text-gray-500"> */}
              {/* {likes.length} */}
              {/* </span> */}
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-md"
          rows="4"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Post Comment
        </button>
      </form>
    </section>
  );
};

export default CommentSection;
