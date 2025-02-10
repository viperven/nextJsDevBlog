"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BaseUrl } from "../../../lib/url"

// This would typically come from a database or API
const posts = [
  {
    slug: "intro-to-react-hooks",
    title: "Introduction to React Hooks",
    content:
      "React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class.",
    author: "Jane Doe",
    date: "2023-05-15",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    slug: "building-restful-apis",
    title: "Building RESTful APIs with Node.js and Express",
    content:
      "RESTful APIs are a cornerstone of modern web development. They provide a standardized way for web services to communicate, allowing for seamless integration between different systems.",
    author: "John Smith",
    date: "2023-05-10",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    slug: "mastering-css-grid",
    title: "Mastering CSS Grid Layout",
    content:
      "CSS Grid Layout is a two-dimensional layout system that has revolutionized the way we design web layouts. It allows for complex layouts to be created with less and more readable CSS.",
    author: "Emily Johnson",
    date: "2023-05-05",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
]

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const initializePost = async () => {
    try {
      if (!params?.id) {
        router.push("/404") // Redirect to 404 page if post not found
      }
      const res = await fetch(`${BaseUrl}posts/get/${params?.id}`);
      const data = await res.json();
      console.log(data);

    }
    catch (err) {
      console.log(err?.message);

    }
  }

  useEffect(() => {
    // 
    initializePost();
  }, [params?.id, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Updating post:", { title, content, imageUrl })
    // After successful update, redirect to the post page
    router.push(`/post/${params?.id}`)
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Preview</h2>
          <Image
            src={imageUrl || "/placeholder.svg"}
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

