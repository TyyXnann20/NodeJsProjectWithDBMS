import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer";
import { request } from "../../util/api";
import "./cart.css";
import {
  Button,
  Col,
  Empty,
  Image,
  Row,
  Space,
  Popconfirm,
  message,
  Input,
  Modal,
  InputNumber,
  Select,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  SaveFilled,
  FilterOutlined,
  CompassOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Config, formatDateForClient } from "../../util/service";
const profile = JSON.parse(localStorage.getItem("profile"));
const { Option } = Select;
var tqty = 0;
const CartC = () => {
  const [customer, setCustomer] = useState([]);
  const [cart_by_customer, setCartByCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexSelect, setIndexSelect] = useState(0);
  const [quantity, setaQty] = useState(0);
  const [cartID, setCartId] = useState(0);
  const [calQty, setCalQty] = useState(0);
  const [calTotal, setCalTotal] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleCheckOut, setVisibleCheckout] = useState(false);
  const [address, setAdress] = useState("");
  const [payment, setPayment] = useState(0);
  const [gAllQty, setAllQty] = useState([]);

  useEffect(() => {
    getListCustomer();
    getAllQty();
  }, []);

  const getListCustomer = () => {
    setLoading(true);
    request("get", "customer/byid/" + profile.customer_id, {}).then((res) => {
      var data = res.data;
      setLoading(false);
      if (data && !data.error) {
        setCustomer(data.list);
        getCartByCustomer(profile.customer_id);
      }
    });
  };

  // const getCartByCustomer = (id) => {
  //   setLoading(true);
  //   request("get", "cart/by-customer/" + id, {}).then((res) => {
  //     var data = res.data;
  //     setLoading(false);
  //     if (data && !data.error) {
  //       setCartByCustomer(data.list);
  //       let getQty = 0;
  //       let getTotalprice = 0;
  //       cart_by_customer.map((item, index) => {
  //         let x = 0; // Initialize x here
  //         let y = 0; // Initialize y here
  //         x += item.quantity;
  //         y += item.price;
  //         getQty += x; // Accumulate x into getQty
  //         getTotalprice += y; // Accumulate y into getTotalprice
  //         setCalQty(getQty);
  //         setCalTotal(getTotalprice);
  //       });
  //     }
  //   });
  // };
  const getAllQty = () => {
    request("post", "cart/follow", { getQty: profile.customer_id }).then(
      (res) => {
        var data = res.data;
        setAllQty(data.list);
      }
    );
  };
  const getCartByCustomer = (id) => {
    setLoading(true);
    request("get", "cart/by-customer/" + id, {}).then((res) => {
      var data = res.data;
      setLoading(false);
      if (data && !data.error) {
        setCartByCustomer(data.list);
      }
    });
  };

  const handSubmit = () => {
    var member = {
      cart_id: cartID,
      quantity: quantity,
    };

    request("put", "cart/cal", member).then((res) => {
      getCartByCustomer(profile.customer_id);
      clearForm();
      getAllQty();
      setVisibleModal(false);
      setLoading(false);
      message.success(res.data.message);
    });
  };
  const handleOrder = () => {
    var customerOder = {
      customer_id: profile.customer_id,
      payment_method_id: payment,
      address_desc: address,
    };

    setLoading(true);
    request("post", "order/create", customerOder).then((res) => {
      var data = res.data;
      setLoading(false);
      if (data && !data.error) {
        message.success(res.data.message);
      }
    });
    handleCloseCheckOut();
  };
  const clearForm = () => {
    setaQty(null);
    setCartId(null);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    clearForm();
  };

  const handleOpenModal = () => {
    setVisibleModal(true);
  };
  const handleRemoveCartItem = (cartId) => {
    // Send a request to the API endpoint to remove the cart item
    request("delete", `cart/remove/${cartId}`, {}).then((res) => {
      if (res.data.error) {
        // Handle any errors during the removal process
        message.error(res.data.message);
      } else {
        // Success message
        message.success(res.data.message);
  
        // Refresh the cart list after successful removal
        window.location.reload();
        getCartByCustomer(profile.customer_id);
        
      }
    });
  };
  
  const handleClickEdit = (item) => {
    setVisibleModal(true);
    setaQty(item.quantity);
    setCartId(item.cart_id);
  };
  const handleCheckout = () => {
    setVisibleCheckout(true);
  };
  const handleCloseCheckOut = () => {
    setVisibleCheckout(false);
  };

  return (
    <Row gutter={5}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #eee" }}
        className="allqty1"
      >
        <PageContainer pageTitle="Cart" loading={loading}>
          {customer.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setIndexSelect(index);
                  getCartByCustomer(item.customer_id);
                }}
                style={{
                  padding: 10,
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  backgroundColor: indexSelect == index && "#ddd",
                }}
                className="allqty"
                key={index}
              >
                <div>
                  {item.firstname + " "}
                  {item.lastname} | {item.tel}
                </div>
                <div>{item.gender == 1 ? "Male" : "Female"}</div>
                <div>{item.email}</div>
              </div>
            );
          })}
        </PageContainer>
      </Col>
      <Col span={14}>
        {cart_by_customer.map((item, index) => {
          return (
            <div
              style={{
                padding: 10,
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              key={index}
            >
              <Row>
                <Col
                  span={4}
                  style={{ borderRight: "1px solid #eee" }}
                  className="allqty"
                >
                  <Image
                    src={Config.imagePath + item.p_image}
                    width={"80%"}
                    alt={item.p_image}
                  />
                </Col>
                <Col
                  span={16}
                  style={{ paddingLeft: 10, marginTop: 10 }}
                  className="allqty"
                >
                  <div>{item.p_name}</div>
                  <div>Quantity : {item.quantity}</div>
                  <div>{formatDateForClient(item.create_at)}</div>
                </Col>
                <Col span={4} className="allqty">
                  <Space>
                    <Popconfirm
                      placement="topRight"
                      title={"Delete"}
                      description={"Are sure to remove this customer"}
                      onConfirm={() => handleRemoveCartItem(item.cart_id)}
                      okText="Delete"
                      cancelText="No"
                    >
                      <Button danger={true} size="small" >
                        <DeleteFilled />
                      </Button>
                    </Popconfirm>

                    <Button onClick={() => handleClickEdit(item, index)}>
                      Add
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>
          );
        })}
        {cart_by_customer.length == 0 && <Empty />}

        <Row style={{ marginTop: "10px" }}>
          <Col span={20} style={{ paddingLeft: 10, marginTop: 10 }}>
            {gAllQty.map((item) => {
              return (
                <div className="allqty">
                  <div>Total Item: {item.AllQty} PCS</div>
                  <div>Total Amount: {item.AllPrice} $</div>
                </div>
              );
            })}
          </Col>
          <Col span={4}>
            <Space>
              <Button
                type="primary"
                onClick={() => handleCheckout()}
                style={{ textAlign: "left" }}
              >
                CheckOut
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>

      <Modal
        open={visibleModal}
        title={"Add or Uncount"}
        onCancel={handleCloseModal}
        footer={null}
        maskClosable={false}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            type="number"
            value={quantity}
            placeholder="add or minuse...."
            onChange={(event) => {
              setaQty(event.target.value);
            }}
          />

          <Button onClick={handSubmit} type="primary">
            {"Save"}
          </Button>
        </Space>
      </Modal>

      <Modal
        open={visibleCheckOut}
        title={"Add"}
        onCancel={handleCloseCheckOut}
        footer={null}
        maskClosable={false}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            type="text"
            value={address}
            placeholder="add or minuse...."
            onChange={(event) => {
              setAdress(event.target.value);
            }}
          />
          <Select
            value={payment}
            defaultValue={"1"}
            style={{ width: "100%" }}
            onChange={(value) => {
              setPayment(value);
            }}
          >
            <Option value={"1"}>Prince Bank</Option>
            <Option value={"2"}>ABA</Option>
            <Option value={"3"}>Wing</Option>
            <Option value={"4"}>ACLEDA</Option>
            <Option value={"5"}>Chip Mong Bank</Option>
            <Option value={"6"}>Visa Card</Option>
            <Option value={"7"}>Master Card</Option>
            <Option value={"8"}>PayPal</Option>
          </Select>

          <Button onClick={handleOrder} type="primary">
            {"Order Now"}
          </Button>
        </Space>
      </Modal>
    </Row>
  );
};

export default CartC;
