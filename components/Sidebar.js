import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <h2 className="text-xl font-bold p-5">Travel Admin</h2>
      <nav>
        <ul className="space-y-4 px-5">
          <li>
            <Link href="/admin">
              <span className="block p-3 hover:bg-gray-700 rounded cursor-pointer">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href="/admin/bookings">
              <span className="block p-3 hover:bg-gray-700 rounded cursor-pointer">
                Bookings
              </span>
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <span className="block p-3 hover:bg-gray-700 rounded cursor-pointer">
                Users
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
