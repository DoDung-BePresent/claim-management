import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Modal,
  notification,
  message,
} from "antd";
import { projectNames, HEADER_TEXTS } from "@/constants/header";
import { claimerService } from "../../services/claimer";
import { useSearchParams } from "react-router-dom";

const { RangePicker } = DatePicker;

export const ClaimModal = ({
  isModalVisible,
  setIsModalVisible,
  form,
  // staffInfo,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = useState([]);

  const calculateTotalWorkingHours = (projectDuration) => {
    if (!projectDuration || projectDuration.length !== 2) {
      throw new Error("Invalid project duration range.");
    }

    const startDate = new Date(projectDuration[0]);
    const endDate = new Date(projectDuration[1]);

    const totalDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    return totalDays * 24;
  };

  const parseClaimValue = (value) => {
    const [claimId, ...projectNameParts] = value.split(" ");
    const projectName = projectNameParts.join(" ");
    return { claimId, projectName };
  };

  async function handleCreateClaim() {
    try {
      let values = await form.validateFields();
      console.log("Form values:", values.projectDuration);
      console.log(
        "Form - values:",
        calculateTotalWorkingHours(values.projectDuration),
      );

      const { claimId, projectName } = parseClaimValue(values.projectName);

      values = {
        ...values,
        status: "Pending",
        totalWorking: calculateTotalWorkingHours(values.projectDuration),
        projectName: projectName,
      };

      delete values.staffId;
      delete values.staffRole;
      delete values.staffDepartment;
      console.log("values", values);

      await claimerService.updateClaimById(claimId, values);
      await fetchClaims();
      setIsModalVisible(false);

      api.success({
        message: "Success",
        description: "Create claim successfully!",
        duration: 3,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  const fetchClaims = async () => {
    try {
      let claims = await claimerService.getClaims();

      claims = claims.filter((claim) => claim.status === "Draft");

      setDataSource([...claims]);
    } catch (error) {
      message.error("Error fetching claims: " + error.message);
    }
  };

  useEffect(() => {
    fetchClaims();
    console.log("OK Done");
    const interval = setInterval(() => {
      fetchClaims();
    }, 3000);

    return () => clearInterval(interval);
  }, [isModalVisible]);

  async function handleSaveDraft() {
    try {
      let values = await form.validateFields();
      console.log("Form values:", values.projectDuration);
      console.log(
        "Form - values:",
        calculateTotalWorkingHours(values.projectDuration),
      );

      const { claimId, projectName } = parseClaimValue(values.projectName);

      values = {
        ...values,
        status: "Draft",
        totalWorking: calculateTotalWorkingHours(values.projectDuration),
        projectName: projectName,
      };

      delete values.staffId;
      delete values.staffRole;
      delete values.staffDepartment;
      console.log("values", values);

      await claimerService.createClaim(values);
      await fetchClaims();

      api.info({
        message: "Info",
        description: "Draft saved successfully!",
        duration: 3,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error(error.message);
    }
  }

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
        style={{ top: 40 }}
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
                // value={staffInfo?.name || ""}
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
                // value={staffInfo?.id || ""}
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
                // value={staffInfo?.department || ""}
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
                {dataSource.map((claim) => (
                  <Select.Option
                    key={claim.id}
                    value={claim.id + " " + claim.projectName}
                  >
                    {/* {claim.label} */}
                    {claim.projectName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              name="staffRole"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input
                placeholder="Enter role"
                className="w-full md:w-1/2"
                style={{ color: "inherit" }}
                disabled
              />
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
