const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
};

export default Header;
