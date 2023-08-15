import axios from "axios";
import { useEffect, useState } from "react";
import {
  DatePicker,
  Button,
  Space,
  Popconfirm,
  Input,
  Modal,
  Divider,
  Select,
  Radio,
  ConfigProvider,
  Spin,
  message,
  Table,
  Image,
} from "antd";
import { Config } from "../../util/service";
import {
  DeleteFilled,
  EditFilled,
  SaveFilled,
  FilterOutlined,
  CompassOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { request } from "../../util/api";
import dayjs from "dayjs";


const Order = ()=>{
  const [list, setList] = useState([])

  useEffect(() => {
    getList(); // call funcion getList
  }, []);

  // create a function fetch data from api
  const getList = () => {

    request("get","wishlist/import").then((res)=>{
      var data = res.data
      setList(data.list)
    }).catch((err)=>{
      console.log(err)
    })
  };




  return(
    <Table
        bordered={true}
        columns={[
          
          {
            title: "import_id",
            key: "import_id",
            dataIndex: "import_id",
          },
          {
            title: "product_id",
            key: "product_id",
            dataIndex: "product_id",
          },
          {
            title: "price",
            key: "price",
            dataIndex: "price",
          },
          
         

         
        ]}
        dataSource={list}
      />
  )

}
export default Order;