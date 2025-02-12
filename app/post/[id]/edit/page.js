"use client"
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BaseUrl } from "../../../lib/url"

const previewImgUrl = "/defaultBlog.jpg"

export default function EditBlogPost() {
  const router = useRouter();

  const params = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const { quill, quillRef } = useQuill();

  const initializePost = async () => {
    try {
      if (!params?.id) {
        router.push("/404") // Redirect to 404 page if post not found
      }
      const res = await fetch(`${BaseUrl}posts/get/${params?.id}`);
      const data = await res.json();

      if (data?.isSuccess) {
        setPost(data?.apiData || []);
      }
      else {
        alert("error while fetching")
      }
      console.log(data);
    }
    catch (err) {
      console.log(err?.message);

    }
  }

  useEffect(() => {
    initializePost();
  }, [])

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);


  

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Updating post:", { title, content, imageUrl })
    // After successful update, redirect to the post page
    router.push(`/post/${params?.id}`)
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <div ref={quillRef} />
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={post?.image || imageUrl || previewImgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Preview</h2>
          <Image
            src={post?.image || imageUrl || previewImgUrl}
            alt="Preview"
            width={400}
            height={200}
            className="w-full h-[200px] object-cover rounded-lg shadow-lg mb-4"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Update Post
          </button>
        </div>
      </form>
    </div>
  )
}

