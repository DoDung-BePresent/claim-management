import React from "react";
import { Form, Input, DatePicker, Select, Modal, notification } from "antd";
import { HEADER_TEXTS } from "@/constants/header";
import { JOD_RANKS } from "@/constants/common";

const { RangePicker } = DatePicker;

export const ClaimModal = ({
  isModalVisible,
  setIsModalVisible,
  form,
  staffInfo,
  isEditing = false,
  onFinish,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleCreateClaim = () => {
    form.validateFields().then((values) => {
      if (isEditing) {
        onFinish?.(values);
      } else {
        console.log("Form values:", values);
        setIsModalVisible(false);
      }
      api.success({
        message: "Success",
        description: `${isEditing ? "Edit" : "Create"} claim successfully!`,
        duration: 3,
      });
    });
  };

  const handleSaveDraft = () => {
    setIsModalVisible(false);
    api.info({
      message: "Info",
      description: "Draft saved successfully!",
      duration: 3,
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={isEditing ? "Edit Claim" : HEADER_TEXTS.createClaimTitle}
        open={isModalVisible}
        onOk={handleCreateClaim}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText={isEditing ? "Save Changes" : HEADER_TEXTS.createClaimButton}
        cancelText={isEditing ? "Cancel" : HEADER_TEXTS.saveDraftButton}
        style={{ top: 40 }}
        cancelButtonProps={{
          onClick: isEditing 
            ? () => setIsModalVisible(false)
            : handleSaveDraft,
        }}
      >
        <p className="mb-4 text-gray-500">
          {HEADER_TEXTS.createClaimDescription}
        </p>
        <Form form={form} layout="vertical">
          <div className="flex-wrap gap-4">
            <Form.Item
              label="Staff Name"
              name="staffName"
              rules={[
                { required: true, message: "Please input the staff name!" },
              ]}
            >
              <Input
                value={staffInfo?.name || ""}
                disabled
                className="w-50 md:w-1/2"
                style={{ color: "inherit" }}
              />
            </Form.Item>
            <Form.Item
              label="Staff ID"
              name="staffId"
              rules={[
                { required: true, message: "Please input the staff ID!" },
              ]}
            >
              <Input
                value={staffInfo?.id || ""}
                disabled
                className="w-full md:w-1/2"
                style={{ color: "inherit" }}
              />
            </Form.Item>
            <Form.Item
              label="Staff Department"
              name="staffDepartment"
              rules={[
                { required: true, message: "Please input the staff ID!" },
              ]}
            >
              <Input
                value={staffInfo?.department || ""}
                disabled
                className="w-full md:w-1/2"
                style={{ color: "inherit" }}
              />
            </Form.Item>
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[
                {
                  required: true,
                  message: "Please select the project name!",
                },
              ]}
            >
              <Select
                placeholder="Select a project"
                className="w-full md:w-1/2"
              >
                <Select.Option value="E-Commerce">E-Commerce</Select.Option>
                <Select.Option value="Banking App">Banking App</Select.Option>
                <Select.Option value="Healthcare System">
                  Healthcare System
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select the role!" }]}
            >
              <Select placeholder="Select the role" className="w-full md:w-1/2">
                {JOD_RANKS.map((rank) => (
                  <Select.Option key={rank.value} value={rank.value}>
                    {rank.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Project Duration"
              name="projectDuration"
              rules={[
                {
                  required: true,
                  message: "Please select the project duration!",
                },
              ]}
            >
              <RangePicker className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
