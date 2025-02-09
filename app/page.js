import BlogPostCard from "./components/BlogPostCard";

const dummyPosts = [
  {
    title: "Introduction to React Hooks",
    excerpt:
      "Learn how to use React Hooks to manage state and side effects in your functional components.",
    author: "Jane Doe",
    date: "2023-05-15",
    id: "intro-to-react-hooks",
    imageUrl: "/placeholder.svg?height=200&width=384",
  },
  {
    title: "Building RESTful APIs with Node.js and Express",
    excerpt:
      "A comprehensive guide to creating robust and scalable APIs using Node.js and Express.",
    author: "John Smith",
    date: "2023-05-10",
    id: "building-restful-apis",
    imageUrl: "/placeholder.svg?height=200&width=384",
  },
  {
    title: "Mastering CSS Grid Layout",
    excerpt:
      "Dive deep into CSS Grid and learn how to create complex layouts with ease.",
    author: "Emily Johnson",
    date: "2023-05-05",
    id: "mastering-css-grid",
    imageUrl: "/placeholder.svg?height=200&width=384",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-20">
        {dummyPosts.map((post, index) => (
          <BlogPostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
