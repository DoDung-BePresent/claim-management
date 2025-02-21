import React, { useState } from "react";
import { Table, Button, Dropdown, Form } from "antd";
import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";
import { DUMMY_STAFFS } from "@/constants/admin";
import StaffModal from "@/components/admin/StaffModal";

const StaffManagement = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(DUMMY_STAFFS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleDelete = (record) => {
    setDataSource((prev) => prev.filter((item) => item.id !== record.id));
  };

  const showModal = (record = null) => {
    setEditingStaff(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (editingStaff) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.id === editingStaff.id ? { ...item, ...values } : item,
        ),
      );
    } else {
      setDataSource((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          key: prev.length + 1,
          ...values,
        },
      ]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const getActionItems = (record) => [
    {
      key: "edit",
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: () => showModal(record),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <Trash className="h-4 w-4" />,
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: "Job Rank",
      dataIndex: "jobRank",
      sorter: (a, b) => a.jobRank.localeCompare(b.jobRank),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      sorter: (a, b) => a.salary - b.salary,
      render: (salary) => `$${salary.toLocaleString()}`,
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
            icon={<MoreHorizontal className="-mb-[1px] h-4 w-4" />}
            className="flex items-center justify-center"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-end">
        <Button
          type="primary"
          icon={<Plus className="-mb-[2.5px] h-5 w-5" />}
          onClick={() => showModal()}
        >
          Create New Staff
        </Button>
      </div>

      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          size: "default",
        }}
      />

      <StaffModal
        isModalVisible={isModalVisible}
        editingStaff={editingStaff}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
      />
    </div>
  );
};

export default StaffManagement;
