import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  // Generate a slug if it doesn't exist
  const slug =
    blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300">
      {/* Image with Gradient Overlay */}
      <div className="relative w-full h-60">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
        <p className="text-gray-600 mt-1 text-sm line-clamp-2">
          {blog.description}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          {new Date(blog.date).toDateString()}
        </p>

        {/* Button */}
        <Link href={`/blog/${slug}`}>
          <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 transition">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
}
