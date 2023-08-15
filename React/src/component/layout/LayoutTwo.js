import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Divider, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LayoutTwo.css";

const { Header, Sider, Content, Footer } = Layout;
const LayoutTwo = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("is_login") == "1";

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChangeMenu = (item) => {
    navigate(item.key);
  };
  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.setItem("is_login", "0");
    window.location.href = "/customerlogin";
  };

  const menu = [
    {
      key: "/homepage",
      icon: <HomeOutlined />,
      label: "Homepage",
    },
    {
      key: "/product",
      icon: <UploadOutlined />,
      label: "Product",
    },
    {
      key: "/cartc",
      icon: <ShoppingCartOutlined />,
      label: "Cart",
    },
    {
      key: "/profile",
      icon: <ProfileOutlined />,
      label: "Profile",
    },

    {
      key: "/order",
      icon: <UnorderedListOutlined />,
      label: "Order",
    },
    {
      key: "/setting",
      icon: <SettingOutlined />,
      label: "Setting",
      onclick: handleLogout,
    },
  ];

  const menuUser = [
    {
      key: "1",
      label: <a>Profile</a>,
      onClick:handleProfile
    },
    {
      key: "2",
      label: <a>Change password</a>,
    },
    {
      key: "3",
      label: <a>Logout</a>,
      icon: <LoginOutlined />,
      onClick: handleLogout,
    },
  ];

  const profile = JSON.parse(localStorage.getItem("profile"));

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
          padding: 0,
          background: "#001529",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menu}
          onClick={handleChangeMenu}
          className="awesome-menu"
        />
        <div className="headerLayoutOne">
          <Dropdown
            overlay={
              <Menu>
                {menuUser.map((item) => (
                  <Menu.Item key={item.key} onClick={item.onClick}>
                    {item.icon && item.icon}
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomRight"
          >
            <Button type="link" className="iconProfile">
              <UserOutlined />
              {profile.firstname} {profile.lastname}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        <div className="mainBody">{props.children}</div>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
        }}
      >
        DATABASE MANAGEMENT GROUP 4 @2023
      </Footer>
    </Layout>
  );
};

export default LayoutTwo;
