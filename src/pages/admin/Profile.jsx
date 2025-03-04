import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Avatar,
  Row,
  Col,
  Divider,
  message,
  Select,
} from "antd";
import { UserOutlined, SaveOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthProvider";

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Updated profile data:", values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Card>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={user?.avatar}
          />
          <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
            {user?.name || "User Name"}
          </Title>
          <Text type="secondary">System Administrator</Text>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            fullName: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            adminRole: user?.adminRole || "super",
          }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: "Please input your name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", message: "Invalid email" }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ pattern: /^[0-9-+()]*$/, message: "Invalid phone number" }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="adminRole"
                label="Admin Role"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select placeholder="Select role">
                  <Option value="super">Super Admin</Option>
                  <Option value="system">System Admin</Option>
                  <Option value="security">Security Admin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 16, textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile; 