import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import { createProject, updateProject } from "@/services/API/apiService";

const { RangePicker } = DatePicker;

const ProjectModal = ({
  isModalVisible,
  editingProject,
  onCancel,
  onSubmit,
  form,
  loadProjects,
  pmOptions,
  qaOptions,
  technicalLeadOptions,
  baOptions,
  developerOptions,
  testerOptions,
  consultancyOptions,
}) => {
  const handleFinish = async (values) => {
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
      onCancel(); 
      form.resetFields(); 
    } catch (error) {
  
    }
  };

  return (
    <Modal
      title={editingProject ? "Edit Project" : "Create New Project"}
      open={isModalVisible}
      onCancel={onCancel}
      style={{ top: 40 }}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="pt-4">
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true, message: "Please input project name!" }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item
            label="Project Code"
            name="projectCode"
            rules={[{ required: true, message: "Please input project code!" }]}
          >
            <Input placeholder="Enter project code" />
          </Form.Item>

          <Form.Item
            label="Project Duration"
            name="projectDuration"
            className="col-span-2"
            rules={[
              { required: true, message: "Project duration is required!" },
            ]}
          >
            <RangePicker
              className="w-full"
              format="YYYY-MM-DD"
              placeholder={["Start Date", "End Date"]}
            />
          </Form.Item>

          <Form.Item
            label="Project Manager"
            name="pm"
            rules={[{ required: true, message: "Please select PM!" }]}
          >
            <Select placeholder="Select PM">
              {pmOptions.map((pm) => (
                <Select.Option key={pm} value={pm}>
                  {pm}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Quality Assurance"
            name="qa"
            rules={[{ required: true, message: "Please select QA!" }]}
          >
            <Select placeholder="Select QA">
              {qaOptions.map((qa) => (
                <Select.Option key={qa} value={qa}>
                  {qa}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Technical Lead"
            name="technicalLead"
            rules={[
              { required: true, message: "Please select Technical Lead!" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select Technical Lead"
              className="w-full"
              maxTagCount="responsive"
            >
              {technicalLeadOptions.map((lead) => (
                <Select.Option key={lead} value={lead}>
                  {lead}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Business Analyst"
            name="ba"
            rules={[{ required: true, message: "Please select BA!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select BA"
              className="w-full"
              maxTagCount="responsive"
            >
              {baOptions.map((ba) => (
                <Select.Option key={ba} value={ba}>
                  {ba}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Developers"
            name="developers"
            className="col-span-2"
            rules={[{ required: true, message: "Please select developers!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select developers"
              className="w-full"
              maxTagCount="responsive"
            >
              {developerOptions.map((dev) => (
                <Select.Option key={dev} value={dev}>
                  {dev}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Testers"
            name="testers"
            className="col-span-2"
            rules={[{ required: true, message: "Please select testers!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select testers"
              className="w-full"
              maxTagCount="responsive"
            >
              {testerOptions.map((tester) => (
                <Select.Option key={tester} value={tester}>
                  {tester}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Technical Consultancy"
            name="technicalConsultancy"
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Please select technical consultancy!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select technical consultancy"
              className="w-full"
              maxTagCount="responsive"
            >
              {consultancyOptions.map((consultant) => (
                <Select.Option key={consultant} value={consultant}>
                  {consultant}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {editingProject ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProjectModal;