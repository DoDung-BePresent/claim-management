import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Form } from "antd";
import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";
import StaffModal from "@/components/admin/StaffModal";
import { fetchStaff, deleteStaff } from "@/services/API/apiService";

const StaffManagement = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const staff = await fetchStaff();
      setDataSource(staff);
    } catch (error) { 

    }
  };

  const handleDelete = async (record) => {
    try {
      await deleteStaff(record.id);
      loadStaff();
    } catch (error) {

    }
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

  const handleSubmit = async (values) => {
    try {
      if (editingStaff) {
        await updateStaff(editingStaff.id, values);
      } else {
        await createStaff(values);
      }
      loadStaff();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      
    }
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

  // Extract unique options from the dataSource
  const staffOptions = [...new Set(dataSource.map((item) => item.staffName))];
  const departmentOptions = ["IT", "HR", "Finance"];

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
        rowKey="id" // Ensure each row has a unique key
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
        loadStaff={loadStaff} 
        staffOptions={staffOptions}
        departmentOptions={departmentOptions}
      />
    </div>
  );
};

export default StaffManagement;