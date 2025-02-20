import React, { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Plus, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Logo } from "@/components/common/Logo";
import { HEADER_LINKS } from "@/constants/header";
import { HEADER_TEXTS } from "@/constants";
import { Avatar, Badge, Button, Dropdown, App, Form } from "antd";
import { CreateClaimModal } from "@/components/claimer/CreateClaimModal";

const { VITE_BASE_API_URL } = import.meta.env;

export const Header = ({ className }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const menuLinks = HEADER_LINKS.find((item) => item.role === user.role);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [staffInfo, setStaffInfo] = useState(null);

  const items = menuLinks.dropdown.menu.map((item) => ({
    key: item.key,
    label: <Link to={item.to}>{item.label}</Link>,
  }));

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`${VITE_BASE_API_URL}/users/${id}`);
      setStaffInfo(response.data);
    } catch (error) {
      console.error("Error fetching staff info:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserById(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (staffInfo) {
      form.setFieldsValue({
        staffName: staffInfo.name,
        staffId: staffInfo.id,
        staffDepartment: staffInfo.department,
      });
    }
  }, [staffInfo, form]);

  const handleLogout = () => {
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <nav className={cn("border-border z-10 border-b px-10 py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              to={menuLinks.home[0].to}
              className="!text-primary underline-offset-4 transition-all duration-150 ease-in hover:!underline"
            >
              {menuLinks.home[0].label}
            </Link>
            <Dropdown
              menu={{
                items,
              }}
            >
              <Link
                to={menuLinks.dropdown?.to}
                className="!text-primary underline-offset-4 transition-all duration-150 ease-in hover:!underline"
              >
                {menuLinks.dropdown.label}
              </Link>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.role === "claimer" && (
            <Button
              type="primary"
              size="large"
              icon={<Plus className="-mb-1" />}
              onClick={() => setIsModalVisible(true)}
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

      <CreateClaimModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        staffInfo={staffInfo}
      />
    </nav>
  );
};
