import React from "react";
import { Form, Input, DatePicker, Select, Modal, notification } from "antd";
import { projectNames, HEADER_TEXTS } from "@/constants";

const { RangePicker } = DatePicker;

export const CreateClaimModal = ({
  isModalVisible,
  setIsModalVisible,
  form,
  staffInfo,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleCreateClaim = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setIsModalVisible(false);
      api.success({
        message: "Success",
        description: "Create claim successfully!",
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
        title={HEADER_TEXTS.createClaimTitle}
        open={isModalVisible}
        onOk={handleCreateClaim}
        onCancel={() => setIsModalVisible(false)}
        okText={HEADER_TEXTS.createClaimButton}
        cancelText={HEADER_TEXTS.saveDraftButton}
        cancelButtonProps={{
          onClick: handleSaveDraft,
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
                {projectNames.map((project) => (
                  <Select.Option key={project.key} value={project.label}>
                    {project.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input placeholder="Enter role" className="w-full md:w-1/2" />
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
              <RangePicker className="w-full md:w-1/2" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
