import AdminLayout from "../../../components/AdminLayout";

export default function AdminCustomers() {
  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Customers</h2>
        <p>Manage all your customers here.</p>
      </div>
    </AdminLayout>
  );
}
