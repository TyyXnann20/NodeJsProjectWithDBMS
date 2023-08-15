import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer";
import { request } from "../../util/api";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./style.css";
import {
  Col,
  Empty,
  Image,
  Row,
  Table,
  Tag,
  Space,
  Button,
  notification,
  message,
} from "antd";
import { Config, formatDateForClient } from "../../util/service";
import axios from "axios";
const profile = JSON.parse(localStorage.getItem("profile"));

// const columns = [
//   {
//     title: "Product Name",
//     dataIndex: "productName",
//     key: "name",
//   },
//   {
//     title: "Image",
//     key: "image",
//     dataIndex: "image",
//     render: (item) => {
//       return <Image width={80} src={Config.imagePath + item} alt={item} />;
//     },
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (text) => <span>${text.toFixed(2)}</span>,
//   },
//   {
//     title: "description",
//     dataIndex: "des",
//     key: "des",
//   },
//   {
//     title: "",
//     key: "action",
//     render: (text, record) => (
//       <Space size="middle">
//         <Button type="primary" onClick={() => addCart(record)}>
//           <ShoppingCartOutlined />
//         </Button>
//       </Space>
//     ),
//   },
// ];

const addCart = (record, items) => {
  request("post", "cart/create", {
    customer_id: profile.customer_id,
    product_id: record.product_id,
    quantity: 1,
  }).then((res) => {
    if (res.status == 200 && res.data.message == "Product already in cart!") {
      message.warning(res.data.message);
    } else {
      message.success(res.data.message);
    }
  });
};

const addToCart = async (record) => {
  try {
    const response = await axios.post("cart/create", {
      customer_id: record.customer_id, // Replace with the appropriate customer ID
      product_id: record.product_id,
      quantity: 1, // Set initial quantity to 1
    });
    if (response.data.message) {
      notification.success({
        message: "Success",
        description: response.data.message,
      });
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Error",
      description: error.message,
    });
  }
};

const WishList = () => {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getList(selectedCategory);
  }, [selectedCategory]);
  
  // const getList = () => {
  //   request("get", "product/get-list", {}).then((res) => {
  //     if (res.status == 200) {
  //       var data = res.data;
  //       setProductList(data.list);
  //     }
  //   });
  // };
  const getList = (category) => {
    const params = category ? { category } : {};
    request("get", "product/get-list", { params }).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setProductList(data.list);
      }
    });
  };
  

  return (
    <section className="products">
    <h3 style={{textAlign:"center", fontSize:"20px"}}>All Products</h3>
    <div className="category-filter">
      <Button
        type={selectedCategory === null ? "primary" : "default"}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </Button>
      <Button
        type={selectedCategory === 4 ? "primary" : "default"}
        onClick={() => setSelectedCategory(4)}
      >
        Asus
      </Button>
      <Button
        type={selectedCategory === 1 ? "primary" : "default"}
        onClick={() => setSelectedCategory(1)}
      >
        MacBook
      </Button>

      <Button
        type={selectedCategory === 2 ? "primary" : "default"}
        onClick={() => setSelectedCategory(2)}
      >
        Dell
      </Button>


      <Button
        type={selectedCategory === 8 ? "primary" : "default"}
        onClick={() => setSelectedCategory(8)}
      >
        MSI
      </Button>
      <Button
        type={selectedCategory === 3 ? "primary" : "default"}
        onClick={() => setSelectedCategory(3)}
      >
        Lenovo
      </Button>
      {/* Add more buttons for other categories */}
    </div>
    <Row justify="center" gutter={[16, 16]}>
      {productList
        .filter(
          (item) =>
            selectedCategory === null || item.category_id === selectedCategory
        )
        .map((item, index) => (

          <Row justify="center" gutter={[16, 16]}>
    
          <Col span={24 } key={index}>
            <div
              className="product"
              style={{ height: "360px", width: "300px" }}
            >
              <Image
                src={Config.imagePath + item.image}
                alt={item.image}
                width={200}
                height={150}
              />
              <div
                className="product-info"
                style={{ height: "360px", width: "300px" }}
              >
                <div
                  className="product-details"
                  style={{ height: "80%", width: "100%" }}
                >
                  <h6
                    className="product-title"
                    style={{ height: "40%", width: "80%", fontWeight:"bold" ,textAlign:"center" , justifyContent:"center"}}
                  >
                    {item.productName}
                  </h6>
                  <h8
                    className="product-des"
                    style={{ height: "60%", width: "80%" }}
                  >
                    {item.des}
                  </h8>
                </div>
                <div className="getB" style={{height:"20%"}}>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="but" style={{ height: "" }}>
                    <Button
                      type="primary"
                      onClick={() => addCart(item)}
                      icon={<ShoppingCartOutlined />}
                    >
                      Add Cart
                     </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        
      </Row>
         
        ))}
    </Row>
  </section>




    // <section className="products">
    //   <h2>Our Products</h2>
    //   <Row justify="center" gutter={[16, 16]}>
    //     {productList.map((item, index) => (
    //       <Col span={24 / 3} key={index}>
    //         <div
    //           className="product"
    //           style={{ height: "360px", width: "300px" }}
    //         >
    //           <Image
    //             src={Config.imagePath + item.image}
    //             alt={item.image}
    //             width={200}
    //             height={150}
    //           />
    //           <div
    //             className="product-info"
    //             style={{ height: "360px", width: "300px" }}
    //           >
    //             <div
    //               className="product-details"
    //               style={{ height: "80%", width: "100%" }}
    //             >
    //               <h6
    //                 className="product-title"
    //                 style={{ height: "40%", width: "80%" }}
    //               >
    //                 {item.productName}
    //               </h6>
    //               <h8
    //                 className="product-des"
    //                 style={{ height: "60%", width: "80%" }}
    //               >
    //                 {item.des}
    //               </h8>
    //             </div>
    //             <div className="getB" style={{height:"20%"}}>
    //               <p>${item.price.toFixed(2)}</p>
    //               <div className="but" style={{ height: "" }}>
    //                 <Button
    //                   type="primary"
    //                   onClick={() => addCart(item)}
    //                   icon={<ShoppingCartOutlined />}
    //                 >
    //                   Add Cart
    //                 </Button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </Col>
    //     ))}
    //   </Row>
    // </section>
    // <>
    //   <h1>Product List</h1>
    //   <Table
    //     columns={columns}
    //     dataSource={productList}
    //     rowKey={(record) => record.product_id}
    //   />
    // </>
  );
};

export default WishList;
