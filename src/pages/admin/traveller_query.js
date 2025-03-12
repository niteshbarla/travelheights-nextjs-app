import AdminLayout from "../../../components/AdminLayout";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch form submissions from the API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/getFormSubmissions");
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  // Get the submissions for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = submissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
          Admin Panel - Form Submissions
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b">Full Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Destination</th>
                <th className="py-3 px-4 border-b">Travel Date</th>
                <th className="py-3 px-4 border-b">Duration</th>
                <th className="py-3 px-4 border-b">Travelers</th>
                <th className="py-3 px-4 border-b">Hotel Type</th>
                <th className="py-3 px-4 border-b">Message</th>
                <th className="py-3 px-4 border-b">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{submission.fullName}</td>
                  <td className="py-3 px-4 border-b">{submission.email}</td>
                  <td className="py-3 px-4 border-b">{submission.phone}</td>
                  <td className="py-3 px-4 border-b">
                    {submission.destination}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(submission.travelDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {submission.duration} nights
                  </td>
                  <td className="py-3 px-4 border-b">
                    Adults: {submission.travelers.adults}, Minors:{" "}
                    {submission.travelers.minors}, Below 5:{" "}
                    {submission.travelers.below5}
                  </td>
                  <td className="py-3 px-4 border-b">{submission.hotelType}</td>
                  <td className="py-3 px-4 border-b">{submission.message}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md border transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
