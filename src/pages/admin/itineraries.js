import AdminLayout from "../../../components/AdminLayout";
import AdminItinerary from "../../../components/AdminItinerary";

export default function ItinerariesAdminPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Itinerary Management</h1>
        <AdminItinerary />
      </div>
    </AdminLayout>
  );
}
