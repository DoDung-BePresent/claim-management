import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Dropdown,
  Form,
  message,
  DatePicker,
  Input,
  Modal,
  notification,
} from "antd";
// import { DUMMY_CLAIMS } from "@/constants/claimer";
import { STATUS_COLORS } from "@/constants/common";
import { Delete, Edit, Eye, Send, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { claimerService } from "../../services/claimer";
import moment from "moment";
import { ClaimModal } from "../../components/claimer/ClaimModal";
import { useAuth } from "@/contexts/AuthProvider";

const ViewClaim = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedClaim, setSelectedClaim] = useState(null);
  const { user } = useAuth();
  const [staff, setStaff] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchStaff = async () => {
      if (user?.id) {
        try {
          const staffData = await claimerService.getUserInfo(user.id);
          setStaff(staffData);
        } catch (error) {
          console.error("Error fetching staff info:", error);
        }
      }
    };

    fetchStaff();
  }, [user]);

  const fetchClaims = async () => {
    try {
      let claims = await claimerService.getClaims();
      if (statusParam) {
        claims = claims.filter((claim) => claim.status === statusParam);
      }
      setDataSource(claims);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchClaims();

    const interval = setInterval(() => {
      fetchClaims();
    }, 1000);

    return () => clearInterval(interval);
  }, [statusParam]);

  const handleDelete = async (record) => {
    setDataSource((prev) => prev.filter((item) => item.id !== record.id));
    try {
      const response = await claimerService.deleteClaimById(record.id);
      if (!response.ok) {
        throw new Error("Failed to delete claim");
      }
      setDataSource((prev) => prev.filter((item) => item.id !== record.id));
      message.success("Claim deleted successfully");
    } catch (error) {
      message.error("Error deleting claim");
      console.error(error);
    }
  };

  const handleUpdate = (record) => {
    form.setFieldsValue({
      ...record,
      staffId: staff.id,
      staffName: staff.name,
      staffDepartment: staff.department,
      startDate: record.startDate ? moment(record.startDate) : null,
      endDate: record.endDate ? moment(record.endDate) : null,
    });
    setIsModalOpen(true);

    // setIsModalVisible(true);
  };

  // const getActionItems = (record) => [
  //   {
  //     key: "update",
  //     label: "Update",
  //     icon: <Edit className="h-4 w-4" />,
  //     onClick: () => console.log("Update", record),
  //   },
  //   {
  //     key: "view",
  //     label: "View",
  //     icon: <Eye className="h-4 w-4" />,
  //     onClick: () => console.log("View", record),
  //   },
  //   {
  //     key: "send",
  //     label: "Send",
  //     icon: <Send className="h-4 w-4" />,
  //     onClick: () => console.log("Send", record),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     key: "delete",
  //     label: "Delete",
  //     icon: <Delete className="h-4 w-4" />,
  //     danger: true,
  //     onClick: () => handleDelete(record),
  //   },
  // ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        startDate: values.startDate
          ? values.startDate.format("YYYY-MM-DD")
          : null,
        endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
      };
      console.log("Dữ liệu gửi lên API:", formattedValues);

      await claimerService.updateClaimById(formattedValues.id, formattedValues);
      console.log(formattedValues);
      fetchClaims();
      api.success({
        message: "Success",
        description: "Update claim successfully!",
        duration: 3,
      });
      setIsModalOpen(false);
    } catch (error) {
      message.error("Cập nhật thất bại!");
    }
  };

  // const handleViewClick = (claim) => {
  //   setSelectedClaim(claim);
  //   setIsModalVisible(true);
  // };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Status",
      dataIndex: "status",
      ...(!statusParam && {
        filters: [
          { text: "Draft", value: "Draft" },
          { text: "Pending", value: "Pending" },
          { text: "Approved", value: "Approved" },
          { text: "Rejected", value: "Rejected" },
        ],
        onFilter: (value, record) => record.status === value,
      }),
      render: (status) => (
        <Tag color={STATUS_COLORS[status] || STATUS_COLORS.default}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Project Duration",
      render: (_, record) => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        return `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      },
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      width: 350,
    },
    {
      title: "Total Working",
      dataIndex: "totalWorking",
      sorter: (a, b) => a.totalWorking - b.totalWorking,
      render: (number) => `${number} hours`,
      width: 150,
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 100,
    //   render: (_, record) => (
    //     <Dropdown
    //       // menu={{ items: getActionItems(record), style: { width: "160px" } }}
    //       menu={{
    //         items: [
    //           {
    //             key: "update",
    //             label: "Update",
    //             icon: <Edit className="h-4 w-4" />,
    //             onClick: () => handleUpdate(record),
    //           },
    //           {
    //             key: "view",
    //             label: "View",
    //             icon: <Eye className="h-4 w-4" />,
    //             onClick: () => handleView(record),
    //           },
    //           {
    //             key: "send",
    //             label: "Send",
    //             icon: <Send className="h-4 w-4" />,
    //           },
    //           {
    //             key: "delete",
    //             label: "Delete",
    //             icon: <Delete className="h-4 w-4" />,
    //             danger: true,
    //             onClick: () => handleDelete(record),
    //           },
    //         ],
    //       }}
    //       trigger={["click"]}
    //       placement="bottomRight"
    //     >
    //       <Button
    //         type="text"
    //         icon={<MoreHorizontal className="h-4 w-4" />}
    //         className="flex items-center justify-center"
    //       />
    //     </Dropdown>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => {
        const isDraft = record.status === "Draft";

        const actionItems = [
          {
            key: "update",
            label: "Update",
            icon: <Edit className="h-4 w-4" />,
            onClick: isDraft ? () => handleUpdate(record) : undefined,
            disabled: !isDraft,
          },
          {
            key: "view",
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            // onClick: isDraft ? () => handleView(record) : undefined,
            // disabled: !isDraft,
          },
          {
            key: "send",
            label: "Send",
            icon: <Send className="h-4 w-4" />,
          },
          {
            key: "delete",
            label: "Delete",
            icon: <Delete className="h-4 w-4" />,
            danger: true,
            onClick: isDraft ? () => handleDelete(record) : undefined,
            disabled: !isDraft,
          },
        ];

        return (
          <Dropdown
            menu={{ items: actionItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreHorizontal className="h-4 w-4" />}
              className="flex items-center justify-center"
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          size: "default",
          pageSize: 10,
        }}
      />
      <Modal
        title="Update Claim"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Id">
            <Input disabled style={{ color: "inherit" }} />
          </Form.Item>
          <Form.Item name="staffName" label="Staff Name">
            <Input disabled style={{ color: "inherit" }} />
          </Form.Item>
          <Form.Item name="staffDepartment" label="Staff Department">
            <Input disabled style={{ color: "inherit" }} />
          </Form.Item>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="totalWorking"
            label="Total Working"
            rules={[{ required: true, message: "Please enter total working" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewClaim;
