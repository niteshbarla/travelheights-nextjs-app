import { useRouter } from "next/router";
import axios from "axios";

const BlogPage = ({ blog, relatedBlogs }) => {
  const router = useRouter();

  // Show a loading state if the page is being generated
  if (router.isFallback) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Split content using "---" as section separator
  const sections = blog.content.split("---").map((section) => section.trim());

  return (
    <div className="max-w-4xl py-12 mx-auto p-5">
      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>

      {/* Blog Image */}
      <div className="w-full h-64 relative rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="mt-6">
        {sections.map((section, index) => {
          // Extract the first line as heading
          const [firstLine, ...contentLines] = section.split("\n");
          const contentParagraphs = contentLines.join("\n").trim();

          // Apply heading styles based on highlight option
          const headingClass =
            blog.highlight === "bold"
              ? "font-bold text-lg"
              : blog.highlight === "underline"
              ? "underline text-lg"
              : blog.highlight === "color"
              ? "text-blue-600 text-lg"
              : "text-lg font-semibold";

          return (
            <div key={index} className="mb-6">
              {firstLine && <h2 className={headingClass}>{firstLine}</h2>}
              <hr className="my-2 border-gray-300" />
              <p className="text-gray-700 whitespace-pre-line">
                {contentParagraphs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Fetch data on the server side
export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    // Fetch blog and related blogs from the API
    const res = await axios.get(
      `http://localhost:3000/api/blogs_details?slug=${slug}`
    );
    const { blog, relatedBlogs } = res.data;

    // If blog is not found, return 404
    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
        relatedBlogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        blog: null,
        relatedBlogs: [],
      },
    };
  }
}

export default BlogPage;
