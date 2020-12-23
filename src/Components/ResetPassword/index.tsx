import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Form, Button, Input, Modal, Row, Col, notification } from "antd";

// import actionSignUp from "../../Actions/SignUp";
import { firebaseSendEmailForgotPassword } from "../../Services/auth";
// import { Auth } from "../../Services/firebase";

const ResetPassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEmail("");
    setEmailError("");
    setIsModalVisible(false);
    form.resetFields();
    Modal.destroyAll();
  };

  const onFinish = async (values: any) => {
    console.log("finished");
    try {
      const msg = await firebaseSendEmailForgotPassword(email);
      if (msg) {
        notification.open({
          message: "Email Sent",
          description:
            "We have sent you the instructions to reset password in your email. Please check",
          onClick: () => {
            // console.log("Notification Clicked!");
          },
        });

        handleCancel();
      }
    } catch (err) {
      setEmailError("User not found!");
      console.log({ err });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    errorInfo.errorFields.map((e: any) => {
      if (e.name[0] === "email") {
        setEmailError(e.errors[0]);
      }
    });
  };

  const renderTitle = () => (
    <>
      <Title level={2} style={{ margin: 0 }}>
        Reset Password
      </Title>
    </>
  );
  return (
    <>
      <Button size="large" onClick={showModal}>
        Reset Password
      </Button>
      {showModal && (
        <Modal
          title={renderTitle()}
          visible={isModalVisible}
          footer={
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                loading={loading}
                form="forgot-password"
                htmlType="submit"
              >
                Reset Password
              </Button>
            </Form.Item>
          }
          bodyStyle={{ padding: "0.5rem 1rem" }}
          onCancel={handleCancel}
        >
          <Form
            name="forgot-password"
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
          >
            <Title level={5}>
              Please enter your email, we will send a reset password link to it.
            </Title>
            <Row gutter={[24, 8]}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  validateStatus={emailError.length > 0 ? "error" : "success"}
                  rules={[
                    { required: true, message: "Please Enter Your Email!" },
                  ]}
                  help={emailError}
                  initialValue=""
                >
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmailError("");
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ResetPassword;
