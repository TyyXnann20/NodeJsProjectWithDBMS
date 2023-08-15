import React from "react";
import { Card, Avatar, List } from "antd";
import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer";
import { request } from "../../util/api";
import { Config } from "../../util/service";
import dayjs from "dayjs";
import { Title } from "chart.js";
const profile = JSON.parse(localStorage.getItem("profile"));
const { Meta } = Card;

const ProfilePage = () => {
  const [list, setList] = useState([]);
  const [history, setHistory] = useState([]);
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
 
  const checkPayment = (value) =>{
    if (value == 1){
        return value = "Prince Bank"
    }
    else if (value == 2){
        return value = "ABA"
    }
    else if (value == 3){
        return value = "Wing"
    }
    else if (value == 5){
        return value = "Chip Mong Bank"
    }
    else if (value == 6){
        return value = "Visa Card"
    }
    else if (value == 7){
        return value = "Master Card"
    }
    else if (value == 8){
        return value = "PayPal"
    }
  }
  useEffect(() => {
    getList(); // call funcion getList
    historyOrder();
  }, []);

  const getList = () => {
    request("post", "customer/profile", { id: profile.customer_id }).then(
      (res) => {
        var data = res.data;
        setFname(data.list.firstname);
        setLname(data.list.lastname);
        setList(data.list);
      }
    );
  };
  const historyOrder = () => {
    request("post", "order/historya", { cuId: profile.customer_id }).then(
      (res) => {
        var data = res.data;
        setHistory(data.list);
      }
    );
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <Card>
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <Meta
              avatar={
                <Avatar
                  src={Config.imagePath + item.image}
                  style={{ width: "120px", height: "120px", marginBottom:"2px" }
              }
              Title={"Hellol"}
                />
              }
            />
            <p >
              <strong>Name:</strong> {item.firstname + " " + item.lastname}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Telephone:</strong> {item.tel}
            </p>
          </React.Fragment>
        ))}

        <List
          header={<div>Order History</div>}
          bordered
          dataSource={history}
          renderItem={(item) => (
            <List.Item>
              <strong>OrderID:</strong> {item.orderId},{" "}
              <strong>TotalPaid:</strong> ${item.TotalPaid},{" "}
              <strong>PaymentBy:</strong> {checkPayment(item.PaymentBy)},
              <strong>Date:</strong>{" "}
              {dayjs(item.Date).format("DD/MM/YYYY")}
            </List.Item>
          )}
        />
      </Card>

      <style jsx>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
        }

        .ant-card {
          width: 600px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .ant-avatar {
          width: 120px;
          height: 120px;
        }

        .ant-card-meta-title {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .ant-list-header {
          font-weight: bold;
          margin-bottom: 10px;
        }
        strong{
            margin: 0px 2px 2px 0px;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
