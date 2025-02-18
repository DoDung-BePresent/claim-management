import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { authService } from "../../services/authService";

const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const user = await authService.login(values);
      setUser(user);
      messageApi.success("Login successful!");
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
          <h1>Sign In</h1>
          <p className="text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Form
          disabled={isLoading}
          form={form}
          name="Sign In Form"
          layout="vertical"
          size="large"
          onFinish={onFinish}
        >
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
          <div className="text-primary">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="!text-primary font-medium !underline"
            >
              Sign Up!
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            htmlType="submit"
            type="primary"
            className="mt-5 w-full"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
