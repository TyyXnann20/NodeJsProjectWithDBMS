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

const ImportProduct = () => {
  const [list, setList] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [orderDetails, setListOrderDeteials] = useState([]);
  const [payment, setListPayment] = useState([]);
  const [gAdmin, setListAdmin] = useState([]);
  const [gCart, setListCart] = useState([]);
  const [gVender, setListVender] = useState([]);
  const [importDettails, setListImportDetails] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    getList(); // call funcion getList
    getListPayment();
    getListOrder();
    getListOrderDetials();
    getAdmin();
    getCart();
    getVender();
    getImportdetails();
  }, []);

  // create a function fetch data from api
  const getList = () => {
    request("get", "wishlist/import")
      .then((res) => {
        var data = res.data;
        setList(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getImportdetails = () => {
    request("get", "wishlist/importd")
      .then((res) => {
        var data = res.data;
        setListImportDetails(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListPayment = () => {
    request("get", "payment/get-list")
      .then((res) => {
        var data = res.data;
        setListPayment(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListOrder = () => {
    request("get", "wishlist/order")
      .then((res) => {
        var data = res.data;
        setListOrder(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListOrderDetials = () => {
    request("get", "wishlist/orderd")
      .then((res) => {
        var data = res.data;
        setListOrderDeteials(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAdmin = () => {
    request("get", "wishlist/admin")
      .then((res) => {
        var data = res.data;
        setListAdmin(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVender = () => {
    request("get", "wishlist/vender")
      .then((res) => {
        var data = res.data;
        setListVender(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCart = () => {
    request("get", "wishlist/cart")
      .then((res) => {
        var data = res.data;
        setListCart(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTableChange = (value) => {
    setSelectedTable(value);
  };

  const importTable = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "venderId",
      key: "venderId",
      dataIndex: "venderId",
    },
    {
      title: "date",
      key: "date",
      dataIndex: "date",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];

  const orderTable = [
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
      title: "total_order",
      key: "total_order",
      dataIndex: "total_order",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "payment_method_id",
      key: "payment_method_id",
      dataIndex: "payment_method_id",
    },
    {
      title: "order_date",
      key: "create_at",
      dataIndex: "create_at",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];

  const orderTableDetials = [
    {
      title: "order_id",
      key: "order_id",
      dataIndex: "order_id",
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
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "qty",
      key: "qty",
      dataIndex: "qty",
    },
    {
      title: "total",
      key: "total",
      dataIndex: "total",
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  const tablePayment = [
    {
      title: "payment_method_id",
      key: "payment_method_id",
      dataIndex: "payment_method_id",
    },
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "code",
      key: "code",
      dataIndex: "code",
    },
  ];

  const tableVender = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "address",
      key: "address",
      dataIndex: "address",
    },
  ];
  const tableCart = [
    {
      title: "cart_id",
      key: "cart_id",
      dataIndex: "cart_id",
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
      title: "quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "create_at",
      key: "create_at",
      dataIndex: "create_at",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];

  const tableAdmin = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "firstname",
      key: "firstname",
      dataIndex: "firstName",
    },
    {
      title: "lastname",
      key: "lastname",
      dataIndex: "lastName",
    },
    {
      title: "username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "password",
      key: "password",
      dataIndex: "password",
    },
    {
      title: "create_at",
      key: "create_at",
      dataIndex: "create_at",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];

  const tableImportDetails = [
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
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "qty",
      key: "qty",
      dataIndex: "qty",
    },
    {
      title: "cost",
      key: "cost",
      dataIndex: "cost",
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  let selectedColumns = [];
  let dataSource = [];

  switch (selectedTable) {
    case "import":
      selectedColumns = importTable;
      dataSource = list;
      break;
    case "order":
      selectedColumns = orderTable;
      dataSource = listOrder;
      break;
    case "orderDetails":
      selectedColumns = orderTableDetials;
      dataSource = orderDetails;
      break;
    case "payment":
      selectedColumns = tablePayment;
      dataSource = payment;
      break;
    case "Cart":
      selectedColumns = tableCart;
      dataSource = gCart;
      break;
    case "Admin":
      selectedColumns = tableAdmin;
      dataSource = gAdmin;
      break;
    case "Vender":
      selectedColumns = tableVender;
      dataSource = gVender;
      break;
    case "ImportDetails":
      selectedColumns = tableImportDetails;
      dataSource = importDettails;
      break;
    default:
      selectedColumns = [];
      dataSource = [];
  }

  return (
    <div>
      <Select onChange={handleTableChange} defaultValue={null}>
        <Select.Option value="import">Import Table</Select.Option>
        <Select.Option value="order">Order Table</Select.Option>
        <Select.Option value="orderDetails">Order Details Table</Select.Option>
        <Select.Option value="payment">Payment Table</Select.Option>
        <Select.Option value="Cart">Cart Table</Select.Option>
        <Select.Option value="Admin">Admin Table</Select.Option>
        <Select.Option value="Vender">Vender Table</Select.Option>
        <Select.Option value="ImportDetails">ImportDetails Table</Select.Option>
      </Select>
      <Table
        bordered={true}
        columns={selectedColumns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default ImportProduct;
