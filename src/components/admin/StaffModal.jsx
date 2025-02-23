import React from "react";
import { Modal, Form, Input, Select, Button, InputNumber } from "antd";
import { createStaff, updateStaff } from "@/services/API/apiService";

const StaffModal = ({
  isModalVisible,
  editingStaff,
  onCancel,
  onSubmit,
  form,
  loadStaff, 
  staffOptions,
  departmentOptions,
}) => {
  const handleFinish = async (values) => {
    try {
      if (editingStaff) {
        await updateStaff(editingStaff.id, values);
      } else {
        await createStaff(values);
      }
      loadStaff(); 
      onCancel(); 
      form.resetFields(); 
    } catch (error) {

    }
  };

  return (
    <Modal
      title={editingStaff ? "Edit Staff" : "Create New Staff"}
      open={isModalVisible}
      onCancel={onCancel}
      style={{ top: 40 }}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Staff Name"
            name="staffName"
            rules={[{ required: true, message: "Please select staff name!" }]}
          >
            <Select placeholder="Select staff">
              {staffOptions.map((staff) => (
                <Select.Option key={staff} value={staff}>
                  {staff}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select department!" }]}
          >
            <Select placeholder="Select department">
              {departmentOptions.map((department) => (
                <Select.Option key={department} value={department}>
                  {department}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Job Rank"
            name="jobRank"
            rules={[{ required: true, message: "Please input job rank!" }]}
          >
            <Input placeholder="Enter job rank" />
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please input salary!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
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