import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Row, Col } from "antd";

import "./index.css";
import Title from "antd/lib/typography/Title";
// import SignUpForm from "../SignUpForm";
import { firebaseSignIn } from "../../Services/auth";
// import ResetPassword from "../ResetPassword";
import { AuthContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";

interface Props {
  // history: History;
}

const LoginForm = (props: Props) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  // const [signUp, setSignUp] = React.useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  // const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    setLoading(true);
    try {
      const user = await firebaseSignIn(email, password);
      if (user) {
        setLoading(false);
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
      const errCode = err.code;
      // const errMessage = err.message;
      if (errCode === "auth/user-not-found") {
        setEmailError("User Not Found!");
      } else if (errCode === "auth/wrong-password") {
        setPasswordError("Wrong Password!");
      } else if (errCode === "auth/invalid-email") {
        setEmailError("Invalid Email");
      } else if (errCode === "auth/too-many-requests") {
        setEmailError("Too Many Request! Please Try After Sometime!");
        setPasswordError("Too Many Request! Please Try After Sometime!");
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    errorInfo.errorFields.map((e: any) => {
      if (e.name[0] === "email") {
        setEmailError(e.errors[0]);
      } else if (e.name[0] === "password") {
        setPasswordError(e.errors[0]);
      }
      return [];
    });
    setLoading(false);
  };

  return (
    <div className="login-form-container">
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Title>Login</Title>
        <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="email"
              validateStatus={emailError.length > 0 ? "error" : "success"}
              help={emailError}
              rules={[{ required: true, message: "Please Enter Your Email!" }]}
            >
              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                disabled={loading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="password"
              validateStatus={passwordError.length > 0 ? "error" : "success"}
              help={passwordError}
              rules={[
                { required: true, message: "Please Enter Your Password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter Your Password"
                value={password}
                disabled={loading}
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Form.Item>
          <Button size="large" loading={loading} block htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <br />
        {/* <Form.Item>
          <ResetPassword />
        </Form.Item>

        <br />

        <Form.Item>
          <SignUpForm setSignUp={setSignUp} />
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default LoginForm;
