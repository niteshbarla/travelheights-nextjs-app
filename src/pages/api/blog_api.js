export async function getRelatedBlogs(keywords) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/getRelatedBlogs?keywords=${encodeURIComponent(
        keywords.join(",")
      )}`
    );
    const data = await res.json();
    console.log("API Response in getRelatedBlogs():", data); // Debugging line
    return data;
  } catch (error) {
    console.error("Error fetching related blogs in getRelatedBlogs():", error);
    return { blogs: [] };
  }
}
