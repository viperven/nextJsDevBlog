"use client"

import { useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import { BaseUrl } from "../../lib/url"

const staticImgUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fblog&psig=AOvVaw1KGgl2TxkwozUkh3dkfiTA&ust=1739366015974000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDp4L3Zu4sDFQAAAAAdAAAAABAE"


export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { quill, quillRef } = useQuill()

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setContent(quill.root.innerHTML)
            })
        }
    }, [quill])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log({ title, content })
        try {
            const res = await fetch(`${BaseUrl}posts/create`, { method: "POST", body: JSON.stringify({ content, image: staticImgUrl }) });
            const data = await res.json();
            if (data?.isSuccess) {
                alert("post created sucessfully..");
            }
            else {
                alert("error in creating post try again");
            }
        }
        catch (err) {
            console.log(err?.message);
            alert("error in creating post try again");
        }

    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
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
                    <div className="mt-1">
                        <div ref={quillRef} />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Preview</h2>
                    <div className="prose max-w-none">
                        <h1>{title}</h1>
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
    )
}

