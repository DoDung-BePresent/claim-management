import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Result
        status="404"
        title={<h1 className="!mt-0">Oops! 404 Not Found</h1>}
        subTitle={
          <p className="text-muted-foreground text-lg">
            The page you are looking for does not exist!
          </p>
        }
        extra={
          <Link to="/">
            <Button type="primary" size="large">
              Home
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
