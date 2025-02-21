"use client";

import { useEffect, useState } from "react";
import BlogPostCard from "./components/BlogPostCard";
import { BaseUrl } from "./lib/url";

export default function Home() {
  const [post, setPost] = useState([]);

  const initializePost = async () => {
    try {
      const res = await fetch(`${BaseUrl}posts/getall`);
      const data = await res.json();
      setPost(data?.apiData || []);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    initializePost();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-20">
        {post.map((post, index) => (
          <BlogPostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}


//test cmd