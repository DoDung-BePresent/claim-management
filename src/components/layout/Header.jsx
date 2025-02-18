import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Plus, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Logo } from "@/components/common/Logo";
import { mainLayoutLinks } from "@/constants/navLinks";
import { Avatar, Badge, Button, Dropdown, Modal, Input, Form, DatePicker, notification, App } from "antd";
import { HEADER_TEXTS } from "@/constants";
import Swal from 'sweetalert2';

const { RangePicker } = DatePicker;

export const Header = ({ className }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const menuLinks = mainLayoutLinks.find((item) => item.role === user.role);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const items = menuLinks.dropdown.menu.map((item) => ({
    key: item.key,
    label: <Link to={item.to}>{item.label}</Link>,
  }));

  const handleLogout = () => {
    setUser(null);
    navigate("/sign-in");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreateClaim = () => {
    form.validateFields().then(values => {
      setIsModalVisible(false);
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Create new claim successfully!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          container: 'mb-5 mr-3'
        }
      });
    });
  };

  const handleSaveDraft = () => {
    setIsModalVisible(false);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'info',
      title: 'Draft saved successfully!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        container: 'mb-5 mr-3'
      }
    });
  };

  return (
    <App>
      <nav className={cn("border-border border-b px-10 py-3", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Logo />
            <div className="flex items-center gap-4">
              <Link
                to={menuLinks.home[0].to}
                className="underline-offset-4 transition-all duration-150 ease-in hover:underline"
              >
                {menuLinks.home[0].label}
              </Link>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <span className="underline-offset-4 transition-all duration-150 ease-in hover:underline">
                  {menuLinks.dropdown.label}
                </span>
              </Dropdown>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user.role === "claimer" && (
              <Button
                type="primary"
                size="large"
                icon={<Plus className="-mb-1" />}
                onClick={showModal}
              />
            )}
            <Button
              size="large"
              type="text"
              icon={
                <Badge dot>
                  <Bell className="-mb-1" />
                </Badge>
              }
            />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: HEADER_TEXTS.myAccount,
                    disabled: true,
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "2",
                    label: HEADER_TEXTS.profile,
                    icon: <User className="h-5 w-5" />,
                    extra: "⌘P",
                  },
                  {
                    key: "3",
                    label: HEADER_TEXTS.settings,
                    icon: <Settings className="h-5 w-5" />,
                    extra: "⌘S",
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "4",
                    label: HEADER_TEXTS.logout,
                    icon: <LogOut className="h-4 w-4" />,
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <Avatar
                src={user.avatar.length > 0 ? user.avatar : null}
                size="large"
              >
                <span className="text-lg font-semibold">
                  {user?.name?.split(" ")?.[0]?.charAt(0).toUpperCase()}
                </span>
              </Avatar>
            </Dropdown>
          </div>
        </div>

        <Modal
          title={HEADER_TEXTS.createClaimTitle}
          open={isModalVisible}
          onOk={handleCreateClaim}
          onCancel={handleSaveDraft}
          okText={HEADER_TEXTS.createClaimButton}
          cancelText={HEADER_TEXTS.saveDraftButton}
        >
          <p className="text-gray-500 mb-4">{HEADER_TEXTS.createClaimDescription}</p>
          <Form form={form} layout="vertical">
            <div className=" flex-wrap gap-4">
              <Form.Item label="Staff Name" name="staffName" rules={[{ required: true, message: 'Please input the staff name!' }]}>
                <Input placeholder="Enter staff name" className="w-full md:w-1/2" />
              </Form.Item>
              <Form.Item label="Staff ID" name="staffId" rules={[{ required: true, message: 'Please input the staff ID!' }]}>
                <Input placeholder="Enter staff ID" className="w-full md:w-1/2" />
              </Form.Item>
              <Form.Item label="Staff Department" name="staffDepartment" rules={[{ required: true, message: 'Please input the staff department!' }]}>
                <Input placeholder="Enter staff department" className="w-full md:w-1/2" />
              </Form.Item>
              <Form.Item label="Project Name" name="projectName" rules={[{ required: true, message: 'Please input the project name!' }]}>
                <Input placeholder="Enter project name" className="w-full md:w-1/2" />
              </Form.Item>
              <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please input the role!' }]}>
                <Input placeholder="Enter role" className="w-full md:w-1/2" />
              </Form.Item>
              <Form.Item label="Project Duration" name="projectDuration" rules={[{ required: true, message: 'Please select the project duration!' }]}>
                <RangePicker className="w-full md:w-2/2" />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </nav>
    </App>
  );
};
