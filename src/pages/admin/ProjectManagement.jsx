import React, { useState } from "react";
import { Table, Button, Dropdown, Form } from "antd";
import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";
import { DUMMY_PROJECTS } from "@/constants/admin";
import dayjs from "dayjs";
import ProjectModal from "@/components/admin/ProjectModal";

const ProjectManagement = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(DUMMY_PROJECTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleDelete = (record) => {
    setDataSource((prev) => prev.filter((item) => item.id !== record.id));
  };

  const showModal = (record = null) => {
    setEditingProject(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        projectDuration: [dayjs(record.startDate), dayjs(record.endDate)],
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSubmit = (values) => {
    const [startDate, endDate] = values.projectDuration;
    const formattedValues = {
      ...values,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    delete formattedValues.projectDuration;

    if (editingProject) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.id === editingProject.id
            ? { ...item, ...formattedValues }
            : item,
        ),
      );
    } else {
      setDataSource((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          key: prev.length + 1,
          ...formattedValues,
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
      key: "Id",
      title: "Id",
      dataIndex: "id",
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "Project Name",
      title: "Project Name",
      dataIndex: "projectName",
      fixed: "left",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      key: "Project Code",
      title: "Project Code",
      dataIndex: "projectCode",
      sorter: (a, b) => a.projectCode.localeCompare(b.projectCode),
    },
    {
      key: "Duration",
      title: "Duration",
      render: (_, record) => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        return `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      },
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      width: 350,
    },
    {
      key: "PM",
      title: "PM",
      dataIndex: "pm",
      sorter: (a, b) => a.pm.localeCompare(b.pm),
    },
    {
      key: "QA",
      title: "QA",
      dataIndex: "qa",
      sorter: (a, b) => a.qa.localeCompare(b.qa),
    },
    {
      key: "Technical Lead",
      title: "Technical Lead",
      dataIndex: "technicalLead",
      render: (technicalLead) => technicalLead.join(", "),
    },
    {
      key: "BA",
      title: "BA",
      dataIndex: "ba",
      render: (ba) => ba.join(", "),
    },
    {
      key: "Developers",
      title: "Developers",
      dataIndex: "developers",
      render: (developers) => developers.join(", "),
    },
    {
      key: "Testers",
      title: "Testers",
      dataIndex: "testers",
      render: (testers) => testers.join(", "),
    },
    {
      key: "Technical Consultancy",
      title: "Technical Consultancy",
      dataIndex: "technicalConsultancy",
      render: (technicalConsultancy) => technicalConsultancy.join(", "),
    },
    {
      key: "Actions",
      title: "Actions",
      width: 100,
      fixed: "right",
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
          Create New Project
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
        scroll={{ x: "max-content" }}
      />

      <ProjectModal
        isModalVisible={isModalVisible}
        editingProject={editingProject}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        form={form}
      />
    </div>
  );
};

export default ProjectManagement;
