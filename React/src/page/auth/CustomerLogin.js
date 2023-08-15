import React, { useState } from "react";
import { request } from "../../util/api";
import ModalForm from "./ModalForm";
import {
  message,
  Form,
  Input,
  Typography,
  Button,
  Divider,
  Modal,
  Radio,
  Select,
  Space,
  DatePicker,
} from "antd";
import "./CustomerLogin.css";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export default function CustomerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [pass, setPass] = useState("");
  const [dob, setDob] = useState();
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [isActive, setIsActive] = useState(1);

  const [visibleModal, setVisibleModal] = useState(false);

  const createAccount = () => {
    request("post", "customer/create", {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      tel:tel,
      username: email,
      password:pass,
      image:image,
      isActive: isActive,
    })
      .then((res) => {
        setVisibleModal(false);
        clearForm();
        message.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  const navigate = useNavigate()

  const handleLogin = () => {
    var params = {
      username: username,
      password: password,
    };
    request("POST", "customer/login", params).then((res) => {
      if (res.data && res.data.is_login) {
        localStorage.setItem("is_login", "1");
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        window.location.href = "/";
      } else {
        message.warning(res.data.message);
      }
    });
  };

  const openModal = () => {
   navigate('/register')
  };

  const handleCancel = () => {
    setVisibleModal(false);
    clearForm();
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <Form className="formLogin">
        <Typography.Title style={{ alignItems: "center", color: "whitesmoke" }}>
          Login Form
        </Typography.Title>
        <Form.Item>
          <Input
            placeholder="Enter Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            rules={[
              {
                required: true,
                message: "Please fill in your email",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            rules={[
              {
                required: true,
                message: "Please fill in your password",
              },
            ]}
          />
        </Form.Item>
        <Button type="primary" onClick={handleLogin} htmlType="submit" block>
          Login
        </Button>
        <Divider style={{ borderColor: "White" }} onClick={openModal}>
          Or Create New Account
        </Divider>
        <div className="social">
          <GoogleOutlined className="iconSocial" style={{ color: "red" }} />
          <FacebookOutlined className="iconSocial" style={{ color: "blue" }} />
          <TwitterOutlined className="iconSocial" style={{ color: "cyan" }} />
        </div>
      </Form>
      <Modal
        visible={visibleModal}
        title={"Create New Account"}
        onCancel={handleCancel}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="First Name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
           <Input
            value={lastname}
            placeholder="Lastname "
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />

          <Select
            value={gender}
            default={"Select Your gender"}
            placeholder="Select Your gender"
            style={{ width: "100%" }}
            onChange={(value) => {
              setGender(value);
            }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </Select>

          <Input
            value={email}
            placeholder="Your Personal email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            value={pass}
            placeholder="password "
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
           <Input
            value={tel}
            placeholder="Your Phone Number"
            onChange={(e) => {
              setTel(e.target.value);
            }}
          />


          <DatePicker
            // picker="year"
            style={{ width: "100%" }}
            placeholder="Date of birth"
            // value={dob}
            onChange={(date, dateString) => {
              setDob(dateString);
              // console.log(data)
              // console.log(dateString)
            }}
          />

          <Radio.Group
            value={isActive}
            onChange={(event) => {
              setIsActive(event.target.value);
            }}
          >
            <Radio value={1}>Actived</Radio>
            <Radio value={0}>Disabled</Radio>
          </Radio.Group>


          {/* Rest of the input fields for the form */}
          {/* ... */}
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              onClick={
                createAccount
              }
            >
              Create
            </Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
}
