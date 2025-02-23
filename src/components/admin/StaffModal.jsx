import React from "react";
import { Modal, Form, Input, Select, Button, InputNumber } from "antd";
import { JOD_RANKS, DEPARTMENT } from "../../constants/admin";

const StaffModal = ({
  isModalVisible,
  editingStaff,
  onCancel,
  onSubmit,
  form,
}) => {
  return (
    <Modal
      title={editingStaff ? "Edit Staff" : "Create New Staff"}
      open={isModalVisible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit} className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Staff Name"
            name="staffName"
            rules={[{ required: true, message: "Please select staff name!" }]}
          >
            <Select placeholder="Select staff">
              <Select.Option value="John Doe">John Doe</Select.Option>
              <Select.Option value="Jane Smith">Jane Smith</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select department!" }]}
          >
            <Select placeholder="Select department">
              {DEPARTMENT.map((dept) => (
                <Select.Option key={dept.value} value={dept.value}>
                  {dept.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Job Rank"
            name="jobRank"
            rules={[{ required: true, message: "Please input job rank!" }]}
          >
            <Select placeholder="Select job rank">
              {JOD_RANKS.map((rank) => (
                <Select.Option key={rank.value} value={rank.value}>
                  {rank.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please input salary!" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              type="number"
              placeholder="Enter salary"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {editingStaff ? "Save Changes" : "Create Staff"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default StaffModal;
