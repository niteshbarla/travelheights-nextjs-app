"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact_api_fetch_data");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Contact Messages
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : contacts.length === 0 ? (
            <p className="text-center text-gray-600">No messages found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Message
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="text-center bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {contact.message}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;
