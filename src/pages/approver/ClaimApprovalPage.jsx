import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Dropdown, Modal, Avatar } from "antd";
import { DUMMY_CLAIMS } from "@/constants/approver";
import { STATUS_COLORS } from "@/constants/common";
import {
  Eye,
  CheckCircle,
  XCircle,
  RotateCcw,
  MoreHorizontal,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ClaimApprovalPage = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const [dataSource, setDataSource] = useState(DUMMY_CLAIMS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    if (statusParam) {
      setDataSource(
        DUMMY_CLAIMS.filter(
          (item) => item.status.toLowerCase() === statusParam.toLowerCase(),
        ),
      );
    } else {
      setDataSource(DUMMY_CLAIMS);
    }
  }, [statusParam]);

  const handleStatusChange = (record, newStatus) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.id === record.id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleViewClick = (record) => {
    setSelectedClaim(record);
    setIsModalVisible(true);
  };

  const getActionItems = (record) => {
    const actions = [
      {
        key: "view",
        label: "View",
        icon: <Eye className="h-4 w-4" />,
        onClick: () => handleViewClick(record),
      },
    ];

    if (record.status !== "Approved" && record.status !== "Rejected" && record.status !== "Returned") {
      actions.push(
        {
          type: "divider",
        },
        {
          key: "approve",
          label: "Approve",
          icon: <CheckCircle className="h-4 w-4" />,
          onClick: () => handleStatusChange(record, "Approved"),
        },
        {
          key: "reject",
          label: "Reject",
          icon: <XCircle className="h-4 w-4" />,
          danger: true,
          onClick: () => handleStatusChange(record, "Rejected"),
        },
        {
          key: "return",
          label: "Return",
          icon: <RotateCcw className="h-4 w-4" />,
          onClick: () => handleStatusChange(record, "Returned"),
        }
      );
    }

    return actions;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Status",
      dataIndex: "status",
      ...(!statusParam && {
        filters: [
          { text: "Pending", value: "Pending" },
          { text: "Approved", value: "Approved" },
          { text: "Paid", value: "Paid" },
        ],
        onFilter: (value, record) => record.status === value,
      }),
      render: (status) => (
        <Tag color={STATUS_COLORS[status] || STATUS_COLORS.default}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Project Duration",
      render: (_, record) => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        return `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      },
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      width: 350,
    },
    {
      title: "Total Working",
      dataIndex: "totalWorking",
      sorter: (a, b) => a.totalWorking - b.totalWorking,
      render: (number) => `${number} hours`,
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionItems(record), style: { width: "160px" } }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreHorizontal className="h-4 w-4" />}
            className="flex items-center justify-center"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          size: "default",
          pageSize: 10,
        }}
      />
      <Modal
        title="Claim Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedClaim && (
          <div className="flex flex-col items-center gap-4">
            <Avatar size={64} src={selectedClaim.avatarUrl} />
            <p><strong>Staff Name:</strong> {selectedClaim.staffName}</p>
            <p><strong>Project Name:</strong> {selectedClaim.projectName}</p>
            <p><strong>Project Duration:</strong> From {new Date(selectedClaim.startDate).toDateString()} to {new Date(selectedClaim.endDate).toDateString()}</p>
            <p><strong>Total Working:</strong> {selectedClaim.totalWorking} hours</p>
            <p><strong>Total Claim Amount:</strong> ${selectedClaim.totalClaimAmount}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClaimApprovalPage;