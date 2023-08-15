const db = require("../config/db.config");
const { isEmptyOrNull } = require("../util/service");

const getList = async (req, res) => {
  var sql =
    "SELECT " +
    " p.*, " +
    " c.name as category_name " +
    " FROM product p  " +
    " INNER JOIN category c ON p.category_id = c.category_id  ";

  var query = req.query;

  // Check if text_search exists in query parameters
  if (!isEmptyOrNull(query.text_search)) {
    const searchText = `%${query.text_search}%`;
    sql +=
      " WHERE p.productName LIKE ? OR p.productName LIKE ?";
    // Add both occurrences of searchText in the query as parameters
    db.query(sql, [searchText, searchText], (error, rows) => {
      if (!error) {
        res.json({
          list: rows,
          list_category: list_category,
        });
      } else {
        res.json({
          error: true,
          message: error,
        });
      }
    });
  } else {
    var list_category = await db.query("SELECT * FROM category");
    db.query(sql, (error, rows) => {
      if (!error) {
        res.json({
          list: rows,
          list_category: list_category,
        });
      } else {
        res.json({
          error: true,
          message: error,
        });
      }
    });
  }
};
const getOne = (req, res) => {
  var { id } = req.params;
  if (isEmptyOrNull(id)) {
    res.json({
      error: true,
      message: {
        id: "Please fill in param id",
      },
    });
  }
  db.query(
    "SELECT * FROM product WHERE product_id = ?",
    [id],
    (error, rows) => {
      if (!error) {
        res.json({
          list: rows,
        });
      } else {
        res.json({
          error: true,
          message: error,
        });
      }
    }
  );
};

const proSearch = (req, res) => {
  var psearch = req.body.psearch;
  var sql = "SELECT p.*, c.name as category_name " +
            "FROM product p " +
            "INNER JOIN category c ON p.category_id = c.category_id " +
            "WHERE p.productName LIKE ? ";

  db.query(sql, [`%${psearch}%`], (err, result) => {
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
const create = (req, res) => {
  var {
    import_id,
    product_id,
    name,
    category_id,
    cost,
    price,
    qty,
    image,
    des,
    
  } = req.body;

  var message = {};

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  if (req.file) {
    image = req.file.filename;
  }

  var sql =
    "INSERT INTO `product` (`product_id`,`category_id`, `productName`, `price`,`qty`, `image`, `des`) VALUES (?,?,?,?, ?,?,?)";

  var paramA = [product_id, category_id, name, price, qty, image, des];
  db.query(sql, paramA, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      var sqlB = "INSERT INTO `importdetails` (`import_id`,`product_id`, `price`, `qty`, `cost`) VALUES (?,?,?,?,?)";
      var paramB = [import_id, product_id, price, qty, cost];
      db.query(sqlB, paramB, (er, list) => {
        if (er) {
          res.json({
            error: true,
            message: error,
          });
        } else {
          res.json({
            message: "Insert yy success......................",
          });
        }
      });
    }
  });
};
const update = (req, res) => {
  var {
    product_id,
    category_id,
    name,
    barcode,
    price,
    quantity,
    image,
    description,
    status,
    create_by,
  } = req.body;

  var message = {};
  if (isEmptyOrNull(product_id)) {
    message.product_id = "Parameter product_id required!";
  }
  if (isEmptyOrNull(category_id)) {
    message.category_id = "Parameter category_id required!";
  }
  if (isEmptyOrNull(name)) {
    message.name = "Please fill in product name!";
  }
  if (isEmptyOrNull(barcode)) {
    message.barcode = "Please fill in barcode!";
  }
  if (isEmptyOrNull(price)) {
    message.price = "Please fill in price!";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "Please fill in quantity!";
  }
  if (isEmptyOrNull(create_by)) {
    message.create_by = "Parameter create_by required!";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var image = null;
  if (req.file) {
    image = req.file.filename;
  }
  var sql =
    "UPDATE `product` SET `category_id`=?, `productName`=?, `price`=?, `qty`=?,`image`=IFNULL(?,image),`des`=? WHERE product_id = ?";
  var paramSql = [
    category_id,
    name,
    price,
    quantity,
    image,
    description,
    product_id,
  ];
  db.query(sql, paramSql, (error, rows) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Product update success!",
      });
    }
  });
};
const remove = (req, res) => {
  var { id } = req.params;
  db.query("DELETE FROM product WHERE product_id = ? ", [id], (error, rows) => {
    if (!error) {
      res.json({
        message: "Product remove success!",
      });
    } else {
      res.json({
        error: true,
        message: error,
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
  proSearch
};
