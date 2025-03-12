import AdminLayout from "../../../components/AdminLayout";
import AuthGuard from "../../../components/AuthGuard";

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p>
            Here you can manage your travel agency's bookings, tours, customers,
            and more.
          </p>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
