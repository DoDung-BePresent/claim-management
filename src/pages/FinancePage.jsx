import React, { useState } from "react";
import { Modal, notification } from "antd";

const FinancePage = () => {
  const claims = [
    { id: 1, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
    { id: 2, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
    { id: 3, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
  ];

  const [selectedClaim, setSelectedClaim] = useState(null);
  const [action, setAction] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionChange = (event, claim) => {
    const selectedAction = event.target.value;
    if (selectedAction === "paid") {
      setSelectedClaim(claim);
      setIsModalOpen(true);
    }
    setAction("");
  };

  const handleOk = () => {
    if (selectedClaim) {
      notification.success({
        message: 'Success',
        description: `Marked claim for ${selectedClaim.staffName}`,
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Approved</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Claim Name</th>
            <th className="border border-gray-300 p-2">Staff Name</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td className="border border-gray-300 p-2">{claim.id}</td>
              <td className="border border-gray-300 p-2">{claim.claimName}</td>
              <td className="border border-gray-300 p-2">{claim.staffName}</td>
              <td className="border border-gray-300 p-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {claim.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  value={action}
                  onChange={(e) => handleActionChange(e, claim)}
                  className="border border-gray-300 p-1 rounded"
                >
                  <option value="">Select Action</option>
                  <option value="view">View Claim</option>
                  <option value="print">Print Claim</option>
                  <option value="paid">Paid</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Confirm Payment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        okButtonProps={{
            style: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
          }}
        cancelText="Cancel"
      >
        <p>{selectedClaim ? `Are you sure you want to Paid ID ${selectedClaim.id} ?` : ''}</p>
      </Modal>
    </div>
  );
};

export default FinancePage; 