import Link from "next/link";
import Image from "next/image";

const BlogPostCard = ({ title, excerpt, author, date, id, imageUrl }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={384}
          height={200}
          className="object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{excerpt}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  src={`https://ui-avatars.com/api/?name=${author}`}
                  alt={author}
                />
              </div>
            </div>
            <span className="ml-2 text-sm">{author}</span>
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link href={`/post/${id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
