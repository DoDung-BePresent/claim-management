import React from "react";
import { useState } from "react";

const mockClaims = [
  { id: "001", name: "Sarah Eastern", status: "PENDING" },
  { id: "002", name: "Sarah Eastern", status: "PENDING" },
  { id: "003", name: "Sarah Eastern", status: "PENDING" },
  { id: "004", name: "Sarah Eastern", status: "PENDING" },
  { id: "005", name: "Sarah Eastern", status: "PENDING" },
  { id: "006", name: "Sarah Eastern", status: "PENDING" },
];

export default function ClaimsPage() {
  const [claims] = useState(mockClaims);
  const [selectedFilter, setSelectedFilter] = useState("PENDING APPROVAL");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-semibold text-lg">Home</span>
          <select
            className="ml-4 border px-2 py-1 rounded"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option>For My Vetting</option>
            <option>Approved or Paid</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="mr-4">🔔</span>
          <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
        </div>
      </nav>

      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold">For My Vetting</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet...</p>
      </div>

      {/* Table */}
      <div className="bg-white shadow p-6 mx-6 rounded">
        <div className="flex justify-end mb-4">
          <select
            className="border px-3 py-2 rounded"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option>PENDING APPROVAL</option>
            <option>APPROVED</option>
          </select>
        </div>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Claim ID</th>
              <th className="p-3">Claim Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">View Claim Request</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id} className="border-b">
                <td className="p-3 text-blue-500">{claim.id}</td>
                <td className="p-3">{claim.name}</td>
                <td className="p-3">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded text-xs">
                    {claim.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-gray-200 px-4 py-2 rounded text-sm">
                    VIEW CLAIM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button className="mx-1 px-4 py-2 bg-gray-300 rounded">&lt;</button>
        {[1, 2, 3, 4, "...", 40].map((num, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded ${
              num === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
        <button className="mx-1 px-4 py-2 bg-gray-300 rounded">&gt;</button>
      </div>
    </div>
  );
}