
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")


const getList = (req,res) => {
    var sql = "SELECT "+
    " c.* , cu.firstname, cu.lastname ,  p.productName as p_name, p.image as p_image "+
    " FROM cart c "+
    " INNER JOIN customers cu ON c.customer_id = cu.customer_id "+
    " INNER JOIN product p ON c.product_id = p.product_id "
    db.query(sql,(error,rows)=>{
        if(!error){
            res.json({
                list: rows
            })
        }else{
            res.json({
                error: true,
                message : error
            })
        }
    })
}
const calculateQty = (req, res) => {
    var { quantity, cart_id, customer_id } = req.body;
    var sql = "UPDATE `cart` SET `quantity`=? WHERE cart_id = ?";
    var param = [quantity, cart_id];
    
    db.query(sql, param, (errr, result) => {
      if (errr) {
        res.json({
          errr: true,
          message: errr
        });
      } else {
        res.json({
          message: "Cart changed...................."
        });
      }
    });
  };

const followUpdate = (req, res) =>{
    var getQty = req.body.getQty
    var sql = "SELECT SUM(ca.quantity) AS AllQty, SUM(p.price * ca.quantity) AS AllPrice FROM customers cu "+
    "JOIN cart ca ON cu.customer_id = ca.customer_id "+
    "JOIN product p ON ca.product_id = p.product_id " +
    "WHERE cu.customer_id = ?;"

    db.query(sql,[getQty], (err, r)=>{
        if(!err){
            res.json({
                list:r
            })
        }
    })
}
  
const getOne = (req,res) => {
    var {id} = req.params
    if(isEmptyOrNull(id)){
        res.json({
            error : true,
            message :{
                id : "Please fill in param id"
            } 
        })
    }
    db.query("SELECT * FROM cart WHERE cart_id = ?",[id],(error,rows)=>{
       if(!error){
            res.json({
                list : rows,
            })
       }else{
            res.json({
                error : true,
                message : error
            })
       }
    })
}

const getCartByCustomer = (req,res) => {
    var {id} = req.params
    // var sql = "SELECT c.* from cart c "+
    // " WHERE c.customer_id = 20 "

    var sql = "SELECT c.*, p.productName as p_name, p.image as p_image,  p.price, (c.quantity * p.price) as total  FROM cart as c "+
    " INNER JOIN product as p ON c.product_id = p.product_id "+
    " WHERE c.customer_id = ? "
    db.query(sql,[id],(error,rows)=>{
        if(!error){
            res.json({
                list:rows
            })
        }else{
            res.json({
                error : true,
                message : error
            })
        }
    })
}

const create = (req, res) => {
    var { customer_id, product_id, quantity } = req.body;
    var message = {};

    if (isEmptyOrNull(customer_id)) {
        message.customer_id = "Please fill in customer_id!";
    }
    if (isEmptyOrNull(product_id)) {
        message.product_id = "Please fill in product_id!";
    }
    if (isEmptyOrNull(quantity)) {
        message.quantity = "Please fill in quantity!";
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        });
        return;
    }

    // Check if the product already exists in the cart
    var checkSql = "SELECT * FROM `cart` WHERE `customer_id` = ? AND `product_id` = ?";
    db.query(checkSql, [customer_id, product_id], (checkError, checkRows) => {
        if (checkError) {
            res.json({
                error: true,
                message: checkError
            });
        } else {
            if (checkRows.length > 0) {
                // Product already exists in the cart
                res.json({
                    error: true,
                    message: "Product already in cart!"
                });
            } else {
                // Product does not exist in the cart, insert it
                var sql = "INSERT INTO `cart`(`customer_id`, `product_id`, `quantity`) VALUES (?,?,?)";
                db.query(sql, [customer_id, product_id, quantity], (insertError, insertRows) => {
                    if (insertError) {
                        res.json({
                            error: true,
                            message: insertError
                        });
                    } else {
                        res.json({
                            message: "Cart insert success!"
                        });
                    }
                });
            }
        }
    });
};

const update = (req,res) => {
    var {cart_id,customer_id,product_id,quantity} = req.body
    var message = {}
    if(isEmptyOrNull(cart_id)){
        message.cart_id = "Please fill in cart_id!"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Please fill in customer_id!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "Please fill in product_id!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Please fill in quantity!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var sql = "UPDATE `cart` SET `customer_id` = ? , `product_id` = ? , `quantity` = ? WHERE cart_id = ?"
    db.query(sql,[customer_id,product_id,quantity,cart_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Cart Update success!",
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM cart WHERE cart_id = ? ",[id],(error,rows)=>{
        if(!error){
            res.json({
                message:"Cart remove success!"
            })
        }else{
            res.json({
                error:true,
                message : error
            })
        }
    })
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove,
    getCartByCustomer,
    calculateQty,
    followUpdate
}