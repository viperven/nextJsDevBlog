"use client";

import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { BaseUrl } from "../../lib/url";
import Image from "next/image";

const previewImgUrl = "/defaultBlog.jpg"

export default function CreatePost() {
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ imageUrl, content });
    try {
      const res = await fetch(`${BaseUrl}posts/create`, {
        method: "POST",
        body: JSON.stringify({ content, image: imageUrl || previewImgUrl }),
      });
      const data = await res.json();
      if (data?.isSuccess) {
        alert("post created sucessfully..");
        setContent("");
        setImageUrl("");
      } else {
        alert("error in creating post try again");
      }
    } catch (err) {
      console.log(err?.message);
      alert("error in creating post try again");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Insert Blog Banner Image Live Url Only [freepik Domain]
          </label>
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <div ref={quillRef} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <div className="prose max-w-none">
            <figure>
              {/* <Image
          src={image || "/placeholder.svg"}
          alt="adsad"
          width={384}
          height={200}
          className="object-cover h-48 w-full"
        /> */}
              <Image
                src={imageUrl || previewImgUrl}
                alt="adsad"
                width={384}
                height={200}
                className="object-contain h-56  w-full"
              />
            </figure>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
