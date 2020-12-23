import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Form, Button, Input, Modal, Row, Col, DatePicker, Radio } from "antd";
import moment from "moment";
import { firebaseSignUp } from "../../Services/auth";

interface Props {
  setSignUp(state: boolean): void;
}

const SignUpForm = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [dobError, setDobError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const [form] = Form.useForm();

  React.useEffect(() => {
    props.setSignUp(isModalVisible);
  }, [isModalVisible]);

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log("cancelled");
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    if (moment().diff(moment(dateOfBirth), "years") >= 18) {
      console.log("dispatching");
      try {
        const user = await firebaseSignUp(email, password);
        if (user) {
          const uid = (user as any).uid;
          console.log({ uid });
        }
      } catch (err) {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode.indexOf("password") > -1) {
          setPasswordError(errMessage);
        } else if (errCode.indexOf("email") > -1) {
          setEmailError(errMessage);
        }
        console.log({ errCode, errMessage });
      }
      // dispatch(
      //   actionSignUp(email, password, firstName, surname, dateOfBirth, gender)
      // );
    } else {
      setDobError("You must be atleast 18 years to register!");
    }

    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    errorInfo.errorFields.map((e: any) => {
      if (e.name[0] === "email") {
        setEmailError(e.errors[0]);
      } else if (e.name[0] === "password") {
        setPasswordError(e.errors[0]);
      }
    });
  };

  const renderTitle = () => (
    <>
      <Title style={{ margin: 0 }}>Sign Up</Title>
      <Title style={{ margin: 0, color: "#808080" }} level={5}>
        It's quick and easy
      </Title>
    </>
  );
  return (
    <>
      <Button size="large" onClick={showModal}>
        Create Account
      </Button>
      <Modal
        title={renderTitle()}
        // destroyOnClose={true}
        visible={isModalVisible}
        footer={
          <Form.Item style={{ textAlign: "center" }}>
            <Button loading={loading} form="signUP" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        }
        bodyStyle={{ padding: "0.5rem 1rem" }}
        onCancel={handleCancel}
      >
        <Form
          name="signUP"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
                rules={[
                  { required: true, message: "Please Enter Your Email!" },
                ]}
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
          <Row gutter={[24, 8]}>
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
          </Row>
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
                    m
                      ? setDateOfBirth(m.toISOString())
                      : moment().toISOString();
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
      </Modal>
    </>
  );
};

export default SignUpForm;
