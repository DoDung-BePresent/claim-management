import React, { useState } from "react";
import { Table, Button, Dropdown, Form, Modal } from "antd";
import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";
import { DUMMY_STAFFS, DEPARTMENT, JOD_RANKS } from "@/constants/admin";
import StaffModal from "@/components/admin/StaffModal";

const StaffManagement = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(DUMMY_STAFFS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleDelete = (record) => {
    setStaffToDelete(record);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    setDataSource((prev) =>
      prev.filter((item) => item.id !== staffToDelete.id),
    );
    setDeleteConfirmVisible(false);
    setStaffToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setStaffToDelete(null);
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
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: "Department",
      dataIndex: "department",
      filters: DEPARTMENT,
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Job Rank",
      dataIndex: "jobRank",
      filters: JOD_RANKS,
      onFilter: (value, record) => record.jobRank === value,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      sorter: (a, b) => a.salary - b.salary,
      render: (salary) => `$${salary.toLocaleString()}`, // Nên dùng IntCurrency
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
        onChange={(pagination) => setPagination(pagination)}
      />

      <StaffModal
        isModalVisible={isModalVisible}
        editingStaff={editingStaff}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
      />

      <Modal
        title="Confirm Delete"
        open={deleteConfirmVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete staff member "
          {staffToDelete?.staffName}"?
        </p>
        <p className="text-muted-foreground">This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default StaffManagement;
