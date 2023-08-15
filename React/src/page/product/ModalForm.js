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
        import_id: items.import_id,
        product_id: items.product_id,
        category_id: items.category_id,
        name: items.name,
        price: items.price,
        cost: items.cost,
        qty: items.qty,
        des: items.des,
        image: items.image,
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
          name={"name"}
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
        <Row gutter={5}>
          <Col span={12}>
            <Form.Item
              label={"import_id"}
              name={"import_id"}
              rules={[
                {
                  required: true,
                  message: "Please input import_id!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="import_id" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={"product_id"}
              name={"product_id"}
              rules={[
                {
                  required: true,
                  message: "Please input product_id!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="product_id" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={5}>
          <Col span={16}>
            <Form.Item name={"image"}>
              <input type="file" multiple onChange={onChangeImage} />

              {imgFile != null ? (
                <Image src={imgFile} style={{ width: 100 }} alt={imgFile} />
              ) : (
                <div>
                  {items && (
                    <Image
                      src={Config.imagePath + items.image}
                      style={{ width: 100 }}
                      alt={items.image}
                    />
                  )}
                </div>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={5}>
          <Col span={12}>
            <Form.Item
              label={"price"}
              name={"price"}
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="cost_price" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={"cost"}
              name={"cost"}
              rules={[
                {
                  required: true,
                  message: "Please input cost!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="selling_price"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={5}>
          <Col span={12}>
            <Form.Item
              label={"qty"}
              name={"qty"}
              rules={[
                {
                  required: true,
                  message: "Please input product qty!",
                },
              ]}
            >
              <Input placeholder="Product quantity" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={"Category"}
              name={"category_id"}
              rules={[
                {
                  required: true,
                  message: "Please input product category_id!",
                },
              ]}
            >
              <Select
                placeholder="Please select a category"
                options={listCategory}
              ></Select>
            </Form.Item>
          </Col>
        </Row>

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
              {items != null ? "Update" : "Save"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
