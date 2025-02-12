import Link from "next/link";
import Image from "next/image";

const BlogPostCard = ({ content, image, createdAt, _id }) => {

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={image || "/placeholder.svg"}
          alt="Blog Image"
          width={384}
          height={200}
          className="object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <div dangerouslySetInnerHTML={{ __html: content.slice(0, 1200) + (content.length > 1200 ? "..." : "") }} />
        <div className="card-actions justify-end mt-4">
          <Link href={`/post/${_id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
