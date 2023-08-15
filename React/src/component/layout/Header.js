import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">Forgot Password</Menu.Item>
    <Menu.Item key="2">Logout</Menu.Item>
  </Menu>
);

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="logo">Your Logo</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="product">Product</Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          Cart
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} style={{ float: 'right' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" icon={<DownOutlined />}>
              Profile
            </Button>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
