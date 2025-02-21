import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";

const { RangePicker } = DatePicker;

const ProjectModal = ({
  isModalVisible,
  editingProject,
  onCancel,
  onSubmit,
  form,
}) => {
  return (
    <Modal
      title={editingProject ? "Edit Project" : "Create New Project"}
      open={isModalVisible}
      onCancel={onCancel}
      style={{ top: 40 }}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit} className="pt-4">
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
              <Select.Option value="John Doe">John Doe</Select.Option>
              <Select.Option value="Jane Smith">Jane Smith</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Quality Assurance"
            name="qa"
            rules={[{ required: true, message: "Please select QA!" }]}
          >
            <Select placeholder="Select QA">
              <Select.Option value="Alice Johnson">Alice Johnson</Select.Option>
              <Select.Option value="Bob Wilson">Bob Wilson</Select.Option>
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
              <Select.Option value="Tech Lead 1">Tech Lead 1</Select.Option>
              <Select.Option value="Tech Lead 2">Tech Lead 2</Select.Option>
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
              <Select.Option value="BA 1">BA 1</Select.Option>
              <Select.Option value="BA 2">BA 2</Select.Option>
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
              <Select.Option value="Dev 1">Dev 1</Select.Option>
              <Select.Option value="Dev 2">Dev 2</Select.Option>
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
              <Select.Option value="Tester 1">Tester 1</Select.Option>
              <Select.Option value="Tester 2">Tester 2</Select.Option>
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
              <Select.Option value="Consultant 1">Consultant 1</Select.Option>
              <Select.Option value="Consultant 2">Consultant 2</Select.Option>
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
