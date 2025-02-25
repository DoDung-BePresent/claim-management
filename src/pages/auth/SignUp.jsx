import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input, message } from "antd";

import { authService } from "@/services/auth";
import { useAuth } from "@/contexts/AuthProvider";

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const { confirmPassword, ...userData } = values;
      const user = await authService.register(userData);
      messageApi.success("Registration successful!");
      navigate("/");
    } catch (error) {
      messageApi.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-md">
      {contextHolder}
      <div className="space-y-5">
        <div className="space-y-2">
          <h1>Sign Up</h1>
          <p className="text-muted-foreground">
            Enter your email below to create new account!
          </p>
        </div>
        <Form
          disabled={isLoading}
          form={form}
          name="Sign Up Form"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            validateTrigger="onBlur"
          >
            <Input placeholder="john" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            validateTrigger="onBlur"
          >
            <Input placeholder="john@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateTrigger="onBlur"
          >
            <Input.Password placeholder="••••••••••••" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password and confirm password don't match!"),
                  );
                },
              }),
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password placeholder="••••••••••••" />
          </Form.Item>
          <div className="text-primary">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="!text-primary font-medium !underline"
            >
              Sign In!
            </Link>
          </div>
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            className="mt-5 w-full"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
