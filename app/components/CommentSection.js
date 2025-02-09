"use client";

import { useState } from "react";

const CommentSection = ({ postSlug }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice",
      content: "Great article! Very informative.",
      date: "2023-05-20",
    },
    {
      id: 2,
      author: "Bob",
      content: "I learned a lot from this. Thanks for sharing!",
      date: "2023-05-21",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Anonymous", // In a real app, this would be the logged-in user
        content: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
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
