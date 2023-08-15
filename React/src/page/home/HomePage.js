import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { request } from "../../util/api";
import {UserData, gist} from './Data'
import BarChart from "./BarChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [stockOut, setStockOut] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [list, setList] = useState([]);
  const [eachMonth, setEachMonth] = useState([]);


  useEffect(() => {

    request("get", "customer/bymonth")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setEachMonth(data.list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    // getOrders().then((res) => {
    //   setOrders(res.total);
    //   setRevenue(res.discountedTotal);
    // });
    // getInventory().then((res) => {
    //   setInventory(res.total);
    // });
    // getCustomers().then((res) => {
    //   setCustomers(res.total);
    // });
  }, []);
  

  request("get", "customer/cucount")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setCustomers(
          data.list.map((item) => {
            return item.allorder;
          })
        ); // Add nullish coalescing operator here
      }
    })
    .catch((err) => {
      console.log(err);
    });

   
  request("get", "customer/orcount")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setOrders(
          data.list.map((item) => {
            return item.od;
          })
        ); // Add nullish coalescing operator here
      }
    })
    .catch((err) => {
      console.log(err);
    });
  request("get", "customer/recount")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setRevenue(
          data.list.map((item) => {
            return item.allsum;
          })
        ); // Add nullish coalescing operator here
      }
    })
    .catch((err) => {
      console.log(err);
    });
  request("get", "customer/stockin")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setInventory(
          data.list.map((item) => {
            return item.quantity;
          })
        ); // Add nullish coalescing operator here
      }
    })
    .catch((err) => {
      console.log(err);
    });

  request("get", "customer/stockout")
    .then((res) => {
      if (res.status === 200) {
        var data = res.data;
        setStockOut(
          data.list.map((item) => {
            return item.allqty;
          })
        ); // Add nullish coalescing operator here
      }
    })
    .catch((err) => {
      console.log(err);
    });
   
    const chartData = {
      labels: eachMonth.map((item) => item.month),
      datasets: [
        {
          label: "Total Price",
          data: eachMonth.map((item) => item.total_price),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };

    // const [userData, setUserData] = useState({
    //   labels: UserData.map((data) => data.year),
    //   datasets: [
    //     {
    //       label: "Users",
    //       data: UserData.map((data) => data.userGain),
    //       backgroundColor: [
    //         "rgba(75,192,192,1)",
    //         "#ecf0f1",
    //         "#50AF95",
    //         "#f3ba2f",
    //         "#2a71d0",
    //       ],
    //       borderColor: "black",
    //       borderWidth: 2,
    //     },
        
    //   ],
    // });

    

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"StockIn"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"StockOut"}
          value={stockOut}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <div style={{ width: 600 }}>
          <BarChart chartData={chartData} />
        </div>
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // getOrders().then((res) => {
    //   setDataSource(res.products.splice(0, 3));
    //   setLoading(false);
    // });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

export default Dashboard;
