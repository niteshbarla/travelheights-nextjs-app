import Link from "next/link";
import { logout } from "../src/lib/auth";
import { useRouter } from "next/router";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Admin Panel</span>
        </div>
        <nav>
          <Link
            href="/admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/bookings"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Bookings
          </Link>
          <Link
            href="/admin/traveller_query"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Traveller Query
          </Link>
          <Link
            href="/admin/tour-package-slider"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Tours Package Slider
          </Link>
          <Link
            href="/admin/package_filter_admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Tour Package Filter
          </Link>
          <Link
            href="/admin/client-feedbacks-admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Update Client-Feedback
          </Link>
          <Link
            href="/admin/best-selling-tour-packages-curd-admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Best Selling Tour Packages
          </Link>
          <Link
            href="/admin/blogs-card-admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Blog Card admin
          </Link>
          <Link
            href="/admin/about-admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Update Your About Page
          </Link>
          <Link
            href="/admin/contact-admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Contact Us Data
          </Link>
          <Link
            href="/admin/itineraries"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Update Itineraries
          </Link>
          <Link
            href="/admin/blogs_page_admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800"
          >
            Blogs Pages Admin
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Travel-Heights Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
