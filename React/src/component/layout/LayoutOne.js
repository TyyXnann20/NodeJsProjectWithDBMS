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
  AmazonSquareFilled
} from "@ant-design/icons";
import { Layout, Menu, Button, theme,Dropdown, Divider } from "antd";
import React, { useEffect, useState } from "react";
import {
  useNavigate
} from "react-router-dom"
import "./LayoutOne.css";

const { Header, Sider, Content } = Layout;
const LayoutOne = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const isLogin = localStorage.getItem("admin_login") == "1"

  useEffect(()=>{
    if(!isLogin){
      navigate("/login")
    }
  },[])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const  handleChangeMenu = (item) => {
    navigate(item.key)
  }

  const handleLogout = () => {
    localStorage.setItem("admin_login","0")
    window.location.href = "/login"
  }

  const menu = [
    {
      key: "/Das",
      icon: <UserOutlined />,
      label: "Dashboard",
    },
    {
      key: "/customer",
      icon: <UsergroupAddOutlined />,
      label: "Customer",
    },
    {
      key: "/category",
      icon: <UploadOutlined />,
      label: "Category",
    },
    {
      key: "/product",
      icon: <AmazonSquareFilled />,
      label: "Product",
    },
    {
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      label: "Cart",
    },
    {
      key: "/wishlist",
      icon: <UploadOutlined />,
      label: "Wishlist",
    },
    {
      key: "/order",
      icon: <UnorderedListOutlined />,
      label: "Tables",
    },
    {
      key: "/payment-method",
      icon: <WalletOutlined />,
      label: "Order Details",
    },
    {
      key: "/report",
      icon: <UploadOutlined />,
      label: "Report",
    },
    {
      key: "/setting",
      icon: <SettingOutlined />,
      label: "Setting",
    }
  ]

  const menuUser = [
    {
      key : "1",
      label : (
          <a>
            Profile
          </a>
      )
    },
    {
      key : "2",
      label : (
        <a>
          Change password
        </a>
      )
    },
    {
      key : "3",
      label : (
        <a>
          Logout
        </a>
      ),
      icon : <LoginOutlined />,
      onClick : handleLogout
    },
  ]

  const profile = JSON.parse(localStorage.getItem("profile"))

  return (
    <Layout>

      <Sider  trigger={null} collapsible collapsed={collapsed} style={{color:"white"}}>
        {/* <div className="logoLayoutOne1">
          <div className={`${collapsed ? "profileContainAnimate1" : "profileContain1"}`}>
            ECM
          </div>
        </div> */}
        <div>
          <h1 style={{textAlign:"center",color:"white",padding:15}}>Admin</h1>
          <hr style={{color:"#FFF"}} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={menu}
          onClick={handleChangeMenu}
        />
      </Sider>

      <Layout>
        <div className="headerLayoutOne" style={{backgroundColor:"whitesmoke"}}>
            <MenuUnfoldOutlined
                style={{fontSize:26,paddingLeft:20 }}
                onClick={()=>setCollapsed(!collapsed)}
            />
            <div>
                <Dropdown
                  style={{width:150}}
                  menu={{
                    items:menuUser
                  }}
                  placement="bottomLeft"
                >
                  <Button type="link" className={"iconProfile"}>
                    <UserOutlined />
                    {profile.firstName} {profile.lastName}
                    <DownOutlined/>
                  </Button>
                </Dropdown>
            </div>
        </div>
        <div className="mainBody">
          {props.children}
        </div>
      </Layout>
      
    </Layout>
  );

};
export default LayoutOne;
