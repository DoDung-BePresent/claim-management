import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, Form } from "antd";
import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";
import dayjs from "dayjs";
import ProjectModal from "@/components/admin/ProjectModal";
import { fetchProjects, deleteProject } from "@/services/API/apiService";

const ProjectManagement = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projects = await fetchProjects();
      setDataSource(projects);
    } catch (error) {

    }
  };

  const handleDelete = async (record) => {
    try {
      await deleteProject(record.id);
      loadProjects();
    } catch (error) {

    }
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

  const handleSubmit = async (values) => {
    const [startDate, endDate] = values.projectDuration;
    const formattedValues = {
      ...values,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    delete formattedValues.projectDuration;

    try {
      if (editingProject) {
        await updateProject(editingProject.id, formattedValues);
      } else {
        await createProject(formattedValues);
      }
      loadProjects();
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
      render: (technicalLead) => Array.isArray(technicalLead) ? technicalLead.join(", ") : technicalLead,
    },
    {
      key: "BA",
      title: "BA",
      dataIndex: "ba",
      render: (ba) => Array.isArray(ba) ? ba.join(", ") : ba,
    },
    {
      key: "Developers",
      title: "Developers",
      dataIndex: "developers",
      render: (developers) => Array.isArray(developers) ? developers.join(", ") : developers,
    },
    {
      key: "Testers",
      title: "Testers",
      dataIndex: "testers",
      render: (testers) => Array.isArray(testers) ? testers.join(", ") : testers,
    },
    {
      key: "Technical Consultancy",
      title: "Technical Consultancy",
      dataIndex: "technicalConsultancy",
      render: (technicalConsultancy) => Array.isArray(technicalConsultancy) ? technicalConsultancy.join(", ") : technicalConsultancy,
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

  // Extract unique options from the dataSource
  const pmOptions = [...new Set(dataSource.map((item) => item.pm))];
  const qaOptions = [...new Set(dataSource.map((item) => item.qa))];
  const technicalLeadOptions = [...new Set(dataSource.map((item) => item.technicalLead))];
  const baOptions = [...new Set(dataSource.map((item) => item.ba))];
  const developerOptions = [...new Set(dataSource.map((item) => item.developers))];
  const testerOptions = [...new Set(dataSource.map((item) => item.testers))];
  const consultancyOptions = [...new Set(dataSource.map((item) => item.technicalConsultancy))];

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
        rowKey="id" 
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
        loadProjects={loadProjects} 
        pmOptions={pmOptions}
        qaOptions={qaOptions}
        technicalLeadOptions={technicalLeadOptions}
        baOptions={baOptions}
        developerOptions={developerOptions}
        testerOptions={testerOptions}
        consultancyOptions={consultancyOptions}
      />
    </div>
  );
};

export default ProjectManagement;