import Title from "antd/lib/typography/Title";
import React from "react";
import LoginForm from "../../Components/LoginForm";
import "./index.css";
import { History } from "history";

const LoginPage = (props: { history: History }) => {
  return (
    <div className="login-page-content">
      <div className="description-container">
        <Title>Tiles</Title>
        <Title level={5}>Tiles helps you connect and share photos</Title>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
