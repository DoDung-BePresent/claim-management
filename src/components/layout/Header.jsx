import React from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Plus, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Logo } from "@/components/common/Logo";
import { mainLayoutLinks } from "@/constants/navLinks";
import { Avatar, Badge, Button, Dropdown } from "antd";

export const Header = ({ className }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const menuLinks = mainLayoutLinks.find((item) => item.role === user.role);

  const items = menuLinks.dropdown.menu.map((item) => ({
    key: item.key,
    label: <Link to={item.to}>{item.label}</Link>,
  }));

  const handleLogout = () => {
    setUser(null);
    navigate("/sign-in");
  };

  return (
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
                  label: "My Account",
                  disabled: true,
                },
                {
                  type: "divider",
                },
                {
                  key: "2",
                  label: "Profile",
                  icon: <User className="h-5 w-5" />,
                  extra: "⌘P",
                },
                {
                  key: "3",
                  label: "Settings",
                  icon: <Settings className="h-5 w-5" />,
                  extra: "⌘S",
                },
                {
                  type: "divider",
                },
                {
                  key: "4",
                  label: "Logout",
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
    </nav>
  );
};
