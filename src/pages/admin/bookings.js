import AdminLayout from "../../../components/AdminLayout";

export default function AdminBookings() {
  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <p>Manage all your bookings here.</p>
      </div>
    </AdminLayout>
  );
}
