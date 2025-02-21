import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bell, Plus, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Logo } from "@/components/common/Logo";
import { HEADER_LINKS, HEADER_TEXTS } from "@/constants/header";
import { Avatar, Badge, Button, Dropdown, Form } from "antd";
import { ClaimModal } from "@/components/claimer/ClaimModal";
import { claimerService } from "@/services/claimer";

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

  useEffect(() => {
    if (user?.id) {
      const getUser = async () => {
        const staff = await claimerService.getUserInfo(user?.id);
        setStaffInfo(staff);
      };
      getUser();
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
            <NavLink
              to={menuLinks.home[0].to}
              className={({ isActive }) =>
                cn(
                  "transition-all duration-150 ease-in",
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {menuLinks.home[0].label}
            </NavLink>
            <NavLink
              to={menuLinks.dropdown?.to}
              className={({ isActive }) =>
                cn(
                  "transition-all duration-150 ease-in",
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Dropdown
                menu={{
                  items,
                }}
              >
                {menuLinks.dropdown.label}
              </Dropdown>
            </NavLink>
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

      <ClaimModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        form={form}
        staffInfo={staffInfo}
      />
    </nav>
  );
};
