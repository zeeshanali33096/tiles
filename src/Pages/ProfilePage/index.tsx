import { Col, DatePicker, Input, Radio, Row } from "antd";
import Form from "antd/lib/form";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/AuthProvider";
import { DB } from "../../Services/firebase";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchProfileData();
    return () => {
      console.log("unmounting");
    };
  }, []);

  const fetchProfileData = async () => {
    const document = await DB.collection("Users").doc(currentUser.uid).get();
    const data:any = document.data();

    if(data !== null){
      setFirstName(data.firtName);
      setSurname(data.surname);
      setEmail(data.email);

    }
  };

  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [dobError, setDobError] = useState<string>("");
  const [form] = Form.useForm();

  const onFinish = () => {};

  const onFinishFailed = () => {};
  return (
    <div className="login-form-container">
      <Form
        name="editProfile"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title>Edit Profile</Title>
        <Row gutter={[24, 8]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              initialValue={firstName}
              rules={[
                { required: true, message: "Please Enter Your First Name!" },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="surname"
              rules={[
                { required: false, message: "Please Enter Your Surname!" },
              ]}
              initialValue={surname}
            >
              <Input
                type="text"
                placeholder="Enter Your Surame"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="email"
              initialValue={email}
              validateStatus={emailError.length > 0 ? "error" : "success"}
              rules={[{ required: true, message: "Please Enter Your Email!" }]}
              help={emailError}
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
        {/* <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="password"
              initialValue={password}
              help={passwordError}
              validateStatus={passwordError.length > 0 ? "error" : "success"}
              rules={[
                { required: true, message: "Please Enter Your Password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row> */}
        <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="dateOfBirth"
              // initialValue={moment(dateOfBirth)}
              help={dobError}
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
              label="Date of Birth"
              labelCol={{ span: 6 }}
              validateStatus={dobError.length > 0 ? "error" : "success"}
              labelAlign="left"
            >
              <DatePicker
                style={{ width: "100%" }}
                size="middle"
                // disabledDate={disabledDate}
                onChange={(m) => {
                  setDobError("");
                  m ? setDateOfBirth(m.toISOString()) : moment().toISOString();
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 8]}>
          <Col span={24}>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select your Gender!",
                },
              ]}
              label="Gender"
              initialValue={gender}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Radio.Group
                onChange={(e) => {
                  console.log({
                    radio: "changed",
                    e: e.target.value,
                    gender,
                  });
                  setGender(e.target.value);
                }}
                value={gender}
              >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfilePage;
