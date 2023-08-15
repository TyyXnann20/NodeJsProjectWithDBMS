import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer";
import { request } from "../../util/api";
import "./orderCss.css";
import React, { Component } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import {
  Col,
  Empty,
  Image,
  Row,
  Table,
  Button,
  Popconfirm,
  Spin,
  DatePicker,
  Space,
  Input,
} from "antd";
import { Config, formatDateForClient } from "../../util/service";
import {
  DeleteFilled,
  EditFilled,
  SaveFilled,
  FilterOutlined,
  CompassOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./orderCss.css";

const Dd = () => {
  const [listOrder, setListOrder] = useState([]);
  const [listDetail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yearBy, setYear] = useState("");

  const [totalQty, setTotalQty] = useState(0);
  const [dayBy, setDayBy] = useState("");
  const [monthBy, setBymonth] = useState("");
  const [list, setList] = useState([]);
  const [allqty, setQty] = useState(0);
  const [allPrice, setPrice] = useState(0);

  useEffect(() => {
    getList();
    getListMonth();
  }, []);

  const getList = () => {
    setLoading(true);
    request("post", "order/dd", { dayBy: dayBy })
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          var data = res.data;
          setList(data.list);
          let getQty = 0;
          let getTotalprice = 0;
          data.list.forEach((item) => {
            getQty += item.qty;
            getTotalprice += item.total;
          });

          setQty(getQty);
          setPrice(getTotalprice);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListMonth = () => {
    setLoading(true);
    request("post", "order/month", { yearBy: yearBy, monthBy: monthBy })
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          var data = res.data;
          setList(data.list);
          let getQty = 0;
          let getTotalprice = 0;
          data.list.forEach((item) => {
            getQty += item.qty;
            getTotalprice += item.total;
          });

          setQty(getQty);
          setPrice(getTotalprice);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "No",
      render: (item, items, index) => `${index + 1}/${items.order_id}`,
      key: "No",
    },
    {
      title: "order_id",
      key: "order_id",
      dataIndex: "order_id",
    },
    {
      title: "customer_id",
      key: "customer_id",
      dataIndex: "customer_id",
    },
    {
      title: "product_id",
      key: "product_id",
      dataIndex: "product_id",
    },
    {
      title: "model",
      key: "model",
      dataIndex: "model",
    },
    {
      title: "image",
      key: "image",
      dataIndex: "image",
      render: (item) => {
        return <Image width={80} src={Config.imagePath + item} alt={item} />;
      },
    },
    {
      title: "Date",
      key: "create_at",
      dataIndex: "create_at",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div>
      <div className="inrow">
        <div className="row">
          <Row gutter={[10]}>
            <Col span={8} className="home">
              <div className="home1">
                <div>
                  <div className="price"> {dayBy}</div>
                </div>
                <div>
                  <div className="price"> {monthBy + "-" + yearBy}</div>
                </div>
                <div className="home2">
                  <div className="price">
                    Total Amount: ${allPrice.toFixed(2)}
                  </div>
                  <hr />
                  <div className="price"> Total sale: {allqty}PCS</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="input">
          <Input
            placeholder="Month"
            
            value={monthBy}
            onChange={(e) => setBymonth(e.target.value)}
          />
           <Input
            placeholder="Year"
            value={yearBy}
            onChange={(e) => setYear(e.target.value)}
          />
          <Button type="primary" onClick={getListMonth}>
            Retrieve Data
          </Button>
        </div>

        <div className="input">
          <Input
            placeholder="date"
            type="date"
            value={dayBy}
            onChange={(e) => setDayBy(e.target.value)}
          />
          <Button type="primary" onClick={getList}>
            Retrieve Data
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={list} bordered={true} />
    </div>
  );

  // return (
  //   <div>
  //     {/* Your JSX code */}
  //     <input
  //       type="date"
  //       value={dayBy}
  //       onChange={(e) => setDayBy(e.target.value)}
  //     />
  //     <button onClick={getList}>Retrieve Data</button>

  //     <div>
  //       {list && list.length > 0 ? (
  //         list.map((item) => {
  //           return <h1>{item.customer_id} and {item.order_id}</h1>;
  //         })
  //       ) : (
  //         <Empty />
  //       )}
  //     </div>
  //   </div>
  // );
};

export default Dd;
