import Link from "next/link";
import Image from "next/image";

const BlogPostCard = ({ content, image, createdAt, _id }) => {
  console.log("ss", content.slice(1, 60));

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={image || "/placeholder.svg"}
          alt="adsad"
          width={384}
          height={200}
          className="object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
