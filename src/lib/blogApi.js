export async function getRelatedBlogs(itineraryKeywords) {
  try {
    const response = await fetch("/api/blog-card-admin-api");
    const blogs = await response.json();

    // Filter blogs that match any of the itinerary keywords
    const relatedBlogs = blogs.filter((blog) => {
      // Ensure blog.keywords is an array
      const blogKeywords = Array.isArray(blog.keywords)
        ? blog.keywords.map((keyword) => keyword.trim().toLowerCase())
        : (blog.keywords || "")
            .split(",")
            .map((keyword) => keyword.trim().toLowerCase());

      // Check if any blog keyword matches any itinerary keyword
      return blogKeywords.some((blogKeyword) =>
        itineraryKeywords.includes(blogKeyword)
      );
    });

    return relatedBlogs;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
}
