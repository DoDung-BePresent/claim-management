import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import React from "react";
export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title={
        <p style={{ fontSize: "48px", color: "red" }}>Oops! 404 Not Found</p>
      }
      subTitle={
        <p style={{ fontSize: "20px" }}>Trang bạn tìm không tồn tại!</p>
      }
      extra={
        <Button
          type="primary"
          style={{ fontSize: "18px", padding: "12px 24px" }}
        >
          <Link to="/">
            <span
              style={{
                fontSize: "16px",
                textAlign: "center",
                padding: "5 12px",
              }}
            >
              Quay về trang chủ
            </span>
          </Link>
        </Button>
      }
    />
  );
}
