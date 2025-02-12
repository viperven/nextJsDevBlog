"use client"

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import CommentSection from "../../components/CommentSection";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../lib/url";

const previewImgUrl = "/defaultBlog.jpg"

export default function BlogPost() {
  const [post, setPost] = useState([]);
  const params = useParams();

  const fetchPost = async () => {
    try {
      const res = await fetch(`${BaseUrl}posts/get/${params?.id}`);
      const data = await res.json();
      console.log(data);

      if (data?.isSuccess) {
        setPost(data?.apiData || [])
      }
      else {
        alert("something went wrong file fetching posts ");
      }
    }
    catch (err) {
      console.log(err?.message);

    }
  }

  useEffect(() => {
    fetchPost();
  }, [])



  return (
    <article className="container mx-auto px-4 py-8">
      <Image
        src={post.image || previewImgUrl}
        alt={post.title || "blog image"}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.title || "blog Title"}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />


      <CommentSection postSlug={params?.id} />
    </article>
  );
}
