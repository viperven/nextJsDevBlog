import Image from "next/image";
import { notFound } from "next/navigation";
import CommentSection from "../../components/CommentSection";

// This would typically come from a database or API
const posts = [
  {
    slug: "intro-to-react-hooks",
    title: "Introduction to React Hooks",
    content:
      "React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class. This means you can use React without classes. Hook into React features such as state, context, lifecycle methods, and more with a functional component approach.\n\nThe most commonly used hooks are:\n\n1. useState: For adding state to functional components\n2. useEffect: For performing side effects in functional components\n3. useContext: For consuming context in functional components\n4. useReducer: For managing more complex state logic\n5. useCallback and useMemo: For optimizing performance\n\nHooks solve many problems that developers faced with class components, such as the complexity of lifecycle methods, the difficulty of reusing stateful logic between components, and the confusion around the 'this' keyword in JavaScript classes.",
    author: "Jane Doe",
    date: "2023-05-15",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    slug: "building-restful-apis",
    title: "Building RESTful APIs with Node.js and Express",
    content:
      "RESTful APIs are a cornerstone of modern web development. They provide a standardized way for web services to communicate, allowing for seamless integration between different systems. Node.js, with its event-driven, non-blocking I/O model, is an excellent choice for building fast and scalable APIs. When combined with Express, a minimal and flexible Node.js web application framework, you have a powerful toolkit for API development.\n\nHere are the key steps to build a RESTful API with Node.js and Express:\n\n1. Set up your Node.js environment\n2. Install Express and other necessary dependencies\n3. Create routes for your API endpoints\n4. Implement CRUD operations\n5. Add middleware for error handling, logging, etc.\n6. Test your API using tools like Postman\n7. Document your API for other developers\n\nRemember to follow RESTful principles such as using appropriate HTTP methods (GET, POST, PUT, DELETE), structuring your URLs around resources, and using status codes correctly.",
    author: "John Smith",
    date: "2023-05-10",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  {
    slug: "mastering-css-grid",
    title: "Mastering CSS Grid Layout",
    content:
      "CSS Grid Layout is a two-dimensional layout system that has revolutionized the way we design web layouts. It allows for complex layouts to be created with less and more readable CSS, providing unprecedented control over both rows and columns.\n\nSome key concepts in CSS Grid include:\n\n1. Grid Container: The element on which display: grid is applied\n2. Grid Items: The direct children of the grid container\n3. Grid Lines: The dividing lines that make up the structure of the grid\n4. Grid Tracks: The space between two adjacent grid lines (rows or columns)\n5. Grid Cell: The intersection of a row and a column\n6. Grid Area: A rectangular space surrounded by four grid lines\n\nWith CSS Grid, you can create responsive layouts without media queries, align items both vertically and horizontally with ease, and even create overlapping elements. It's a powerful tool that, when mastered, can significantly improve your web design capabilities.",
    author: "Emily Johnson",
    date: "2023-05-05",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
];

export default async function BlogPost({ params }) {
  console.log(await params);

  const post = posts.find(async (post) => post.id === (await params.id));

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <Image
        src={post.imageUrl || "/placeholder.svg"}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center mb-4 text-gray-600">
        <span>{post.author}</span>
        <span className="mx-2">•</span>
        <span>{post.date}</span>
      </div>
      <div className="prose max-w-none mb-12">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <CommentSection postSlug={await params.id} />
    </article>
  );
}
