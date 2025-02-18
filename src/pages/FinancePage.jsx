import React, { useState } from "react";
import { Modal, Table } from "antd";

const FinancePage = () => {
  const [claims, setClaims] = useState([
    { id: 1, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
    { id: 2, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
    { id: 3, claimName: "Partime", staffName: "Hung Dung", status: "Approved" },
  ]);

  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaid = (record) => {
    setSelectedClaim(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedClaim) {
      setClaims((prevClaims) => prevClaims.filter(c => c.id !== selectedClaim.id));
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Claim Name',
      dataIndex: 'claimName',
      key: 'claimName',
    },
    {
      title: 'Staff Name',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value === "paid") {
              handlePaid(record);
            }
            e.target.value = "";
          }}
          className="border border-gray-300 p-1 rounded"
        >
          <option value="">Select Action</option>
          <option value="view">View Claim</option>
          <option value="print">Print Claim</option>
          <option value="paid">Paid</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Approved</h1>
      </div>
      
      <Table
        columns={columns}
        dataSource={claims}
        rowKey="id"
        pagination={false}
      />

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