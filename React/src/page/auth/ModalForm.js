import { SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import React from "react";
import { Config } from "../../util/service";

const ModalForm = ({
  open = false,
  title = null,
  footer = null,
  onCancel,
  onOk,
  onFinish,
  onChangeImage,
  items,
  imgFile,
  listCategory,
}) => {
  const [form] = Form.useForm(); //

  React.useEffect(() => {
    if (items != null) {
      form.setFieldsValue({
        firstname: items.firstname,
        lastname: items.lastname,
        gender: items.gender,
        email: items.email,
        password:items.pass,
        dob: items.dob,
        tel: items.tel,
        image:items.image
       
       
      });
    }
  }, [items]);

  const handleCancel = () => {
    form.resetFields(); // clear data in form
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancel}
      onOk={onOk}
      footer={footer}
      maskClosable={false}
      width={"50%"}
    >
      <Form
        encType="multipart/form-data"
        form={form}
        name="form_product"
        layout="vertical"
        onFinish={(item) => {
          form.resetFields();
          onFinish(item);
        }}
        initialValues={{
          status: 1,
        }}
      >
        <Divider />

        <Form.Item
          label={"Product name"}
          name={"firstname"}
          rules={[
            {
              required: true,
              message: "f",
            },
          ]}
          // hasFeedback={<SaveFilled/>}
          // validateStatus="error"
          // help="Username does not exist!"
        >
          <Input placeholder="Product name" />
        </Form.Item>
        <Form.Item
          label={"Product name"}
          name={"lastname"}
          rules={[
            {
              required: true,
              message: "f",
            },
          ]}
          // hasFeedback={<SaveFilled/>}
          // validateStatus="error"
          // help="Username does not exist!"
        >
          <Input placeholder="Product name" />
        </Form.Item>



        <Form.Item
          label={"Product name"}
          name={"email"}
          rules={[
            {
              required: true,
              message: "f",
            },
          ]}
          // hasFeedback={<SaveFilled/>}
          // validateStatus="error"
          // help="Username does not exist!"
        >
          <Input placeholder="Product name" />
        </Form.Item>


        <Form.Item
          label={"Product name"}
          name={"password"}
          rules={[
            {
              required: true,
              message: "f",
            },
          ]}
          // hasFeedback={<SaveFilled/>}
          // validateStatus="error"
          // help="Username does not exist!"
        >
          <Input placeholder="Product name" />
        </Form.Item>
        
      

   

     

        <Form.Item
          label={"Product des"}
          name={"des"}
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
          
          // hasFeedback={<SaveFilled/>}
          // validateStatus="error"
          // help="Username does not exist!"
        >
             <Input placeholder="Product name" />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              <SaveFilled />
              {"Click"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
