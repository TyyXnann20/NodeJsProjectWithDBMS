const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");

const getList = (req, res) => {
  var sql = "SELECT * FROM `orderdetails`";
  db.query(sql, (err, rows) => {
    if (!err) {
      res.json({
        list: rows,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};

const getByCustomer = (req, res) => {
  var query = req.query;
  var sql = "SELECT * FROM tbl_order WHERE customer_id = ?";
  var sqlParam = [query.id];
  db.query(sql, sqlParam, (err, rows) => {
    if (!err) {
      res.json({
        list: rows,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};

const getOrderDetail = (req, res) => {
  var { id } = req.params;
  var sqlOrderItem =
    "SELECT *, p.image as p_image from orderdetails op INNER JOIN product p ON op.product_id = p.product_id  WHERE op.order_id = ?";
  db.query(sqlOrderItem, [id], (error, list) => {
    if (!error) {
      res.json({
        list: list,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};

const getOne = (req, res) => {};

const create = (req, res) => {
  var {
    customer_id,
    address_desc,
    comment,
    payment_method_id,
    payment_method_name,
  } = req.body;
  var message = {};

  if (isEmptyOrNull(customer_id)) {
    message.customer_id = "customer_id required!";
  }

  if (isEmptyOrNull(payment_method_id)) {
    message.payment_method_id = "payment_method_id required!";
  }

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  // address info(firstname,lastname....) by address_id
  // var sql = " SELECT a.*,p.name as province_name "+
  // " FROM address a "+
  // " INNER JOIN province p ON a.province_id = p.province_id"
  // " WHERE a.address_id = ? ";
  // var sql = "SELECT cu.* FROM customers cu INNER JOIN (province pro INNER JOIN address ad on ad.province_id = pro.province_id) " +
  // "ON (cu.customer_id = ad.customer_id)" +
  // " WHERE ad.address_id = ?"
  var sql = "SELECT * FROM customers WHERE customer_id=?";
  var param = [customer_id];
  db.query(sql, param, (e1, r1) => {
    //get address info
    if (!e1) {
      if (r1.length > 0) {
        var cus = r1[0];
        console.log(r1[0].firstname);
        sql =
          " SELECT c.*, p.productName as product_name, p.price, (c.quantity * p.price) as total" +
          " FROM cart c" +
          " INNER JOIN product p ON c.product_id = p.product_id" +
          " WHERE c.customer_id = ?";
        param = [customer_id];
        db.query(sql, param, (e2, r2) => {
          // get cart by customer // array item that customer has add to bag
          if (!e2) {
            if (r2.length > 0) {
              var product_order = r2; //
              var total_order = 0;
              var total_item = 0;
              product_order.map((item, index) => {
                total_order += item.total;
                total_item += item.quantity;
              });
              var sqlOrder =
                "INSERT INTO `order` " +
                " (customer_id, total_order, payment_method_id, adress_desc)" +
                " VALUE" +
                " (?,?,?,?)";
              var sqlOrderParam = [
                customer_id,
                total_order,
                payment_method_id,
                address_desc,
              ];
              db.query(sqlOrder, sqlOrderParam, (e3, r3) => {
                // add data to table order
                if (!e3) {
                  // added to order success
                  // added item to order_product
                  var order_id = r3.insertId; // get id ofter insert
                  var is_error = 0;
                  var stock1 = r3[0];
                  product_order.map((item, index) => {
                    // back up product from cart by customer to order_product
                    var sqlProductOrder =
                      "INSERT INTO orderdetails (order_id,product_id, price, qty, total) VALUE (?,?,?,?,?) ";
                    var sqlProductOrderParam = [
                      order_id,
                      item.product_id,
                      item.price,
                      item.quantity,
                      item.quantity * item.price,
                    ];

                    db.query(
                      sqlProductOrder,
                      sqlProductOrderParam,
                      (e4, r4) => {
                        if (!e4) {
                          // re stock
                          var sqlReStock =
                            "UPDATE product SET qty = (qty-?) WHERE product_id = ?";
                          var sqlReStockParam = [
                            item.quantity,
                            item.product_id,
                          ];
                          db.query(sqlReStock, sqlReStockParam, (e5, r5) => {});
                        } else {
                          is_error = 1;
                        }
                      }
                    );
                  });

                  if (is_error == 0) {
                    // remove cart
                    var removeCart = "DELETE FROM cart WHERE customer_id = ?";
                    db.query(removeCart, [customer_id], (e5, r5) => {});
                    res.json({
                      message: "Your order success!",
                    });
                  } else {
                    res.json({
                      error: true,
                      message: "Something wrong!",
                    });
                  }
                } else {
                  res.json({
                    error: true,
                    message: e3,
                  });
                }
              });
            } else {
              res.json({
                error: true,
                message: "Please add item to cart before checkout!",
              });
            }
          } else {
            res.json({
              error: true,
              message: e2,
            });
          }
        });
      } else {
        res.json({
          error: true,
          message: "Address not found!",
        });
      }
    } else {
      res.json({
        error: true,
        message: e1,
      });
    }
  });
};

const getByMonth = (req, res) => {
  var monthBy = req.body.monthBy;
  var yearBy = req.body.yearBy;
  // var query = "SELECT * FROM `order` WHERE DATE(create_at) = ?";
  var query =
    "SELECT  o.customer_id, od.product_id, p.image as image, p.productName as model, o.order_id,  od.qty as qty, od.total as total , o.create_at FROM  orderdetails od" +
    " INNER JOIN product p ON od.product_id = p.product_id" +
    " INNER JOIN `order` o on od.order_id = o.order_id WHERE  YEAR(o.create_at) = ? AND MONTH(o.create_at) = ? ";
  db.query(query, [yearBy, monthBy], (err, result) => {
    if (err) {
      res.json({
        error: true,
        message: err.message,
      });
    } else {
      res.json({
        list: result,
      });
    }
  });
};

const getByDay = (req, res) => {
  var dayBy = req.body.dayBy;
  // var query = "SELECT * FROM `order` WHERE DATE(create_at) = ?";
  var query =
    "SELECT  o.customer_id, od.product_id, p.image as image, p.productName as model, o.order_id,  od.qty as qty, od.total as total , o.create_at FROM  orderdetails od" +
    " INNER JOIN product p ON od.product_id = p.product_id" +
    " INNER JOIN `order` o on od.order_id = o.order_id WHERE DATE(o.create_at) = ? ";
  db.query(query, [dayBy], (err, result) => {
    if (err) {
      res.json({
        error: true,
        message: err.message,
      });
    } else {
      res.json({
        list: result,
      });
    }
  });
};

const historyOrder1 = (req, res) => {
  var cuId = req.body.cuId;
  var sql =
    "SELECT o.order_id as orderId, o.create_at as Date, o.total_order as TotalPaid, " +
    "o.payment_method_id as PaymentBy FROM `order` o " +
    "JOIN `customers` cu ON o.customer_id =  cu.customer_id " +
    "WHERE o.customer_id = ?";
  db.query(sql, [cuId], (err, rows) => {
    if (!err) {
      res.json({
        list: rows,
      });
    } else {
      res.json({
        err: true,
        message: err,
      });
    }
  });
};

const update = (req, res) => {
  var body = req.body;

  var image = null;
  if (req.file) {
    image = req.file.filename;
  }
  var sqlUpdate =
    "UPDATE category SET name=?, description=?, image=IFNULL(?, image) WHERE category_id = ?";
  db.query(
    sqlUpdate,
    [body.name, body.description, image, body.category_id],
    (error, rows) => {
      if (error) {
        res.json({
          error: true,
          message: error,
        });
      } else {
        res.json({
          message: "Customer updated!",
          data: rows,
        });
      }
    }
  );
};

const remove = (req, res) => {};
const ReportByMonth = (req, res) => {
  var monthBy = req.body.monthBy;
  var yearBy = req.body.yearBy;
 
  // var query = "SELECT * FROM `order` WHERE DATE(create_at) = ?";
  var sql =
    "SELECT c.name, SUM(od.qty) AS total_qty, SUM(od.total) AS total_order_value, " +
    "MONTH(o.create_at) AS order_month FROM orderdetails od INNER JOIN " +
    "product p ON od.product_id = p.product_id INNER JOIN `order` o ON od.order_id = o.order_id " +
    "INNER JOIN category c ON p.category_id = c.category_id WHERE " +
    "YEAR(o.create_at) = ? AND  MONTH(o.create_at) = ? GROUP BY c.name, MONTH(o.create_at)";
  db.query(sql, [yearBy, monthBy], (err, result) => {
    if (err) {
      res.json({
        error: true,
        message: err.message,
      });
    } else {
      res.json({
        list: result,
      });
    }
  });
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
  getOrderDetail,
  getByCustomer,
  getByDay,
  historyOrder1,
  getByMonth,
  ReportByMonth
};
