
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")

const getList = (req,res) => {
    var {id} = req.params
    db.query("SELECT w.*, p.name as p_name, p.image as p_image FROM wishlist w INNER JOIN product p ON (p.product_id = w.product_id) WHERE w.customer_id = ?",[id],(error,rows)=>{
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
    db.query("SELECT * FROM wishlist WHERE wishlist_id = ?",[id],(error,rows)=>{
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



const create = (req,res) => {
    var {customer_id,product_id} = req.body
    var message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Please fill in customer_id name!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "Please fill in product_id name!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var sql = "INSERT INTO `wishlist`(`customer_id`, `product_id`) VALUES (?,?)"
    db.query(sql,[customer_id,product_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "You have add to wishlist success!",
            })
        }
    })
}

const update = (req,res) => {
    var {wishlist_id,customer_id,product_id} = req.body
    var message = {}
    if(isEmptyOrNull(wishlist_id)){
        message.wishlist_id = "Please fill in wishlist_id name!"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Please fill in customer_id name!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "Please fill in product_id name!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var sql = "UPDATE `wishlist` SET `customer_id`=?, `product_id`=? WHERE wishlist_id = ?"
    db.query(sql,[customer_id,product_id,wishlist_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "You have add to wishlist success!",
            })
        }
    })
}

const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM wishlist WHERE wishlist_id = ? ",[id],(error,rows)=>{
        if(!error){
            res.json({
                message:"Wishlist remove success!"
            })
        }else{
            res.json({
                error:true,
                message : error
            })
        }
    })
}

const getImportdetails = (req,res)=>{
    var sql = "SELECT * FROM importdetails"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}
const getImport = (req,res)=>{
    var sql = "SELECT * FROM `import`"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}

const ordertab = (req,res)=>{
    var sql = "SELECT * FROM  `order`"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}

const orderdetails1 = (req,res)=>{
    var sql = "SELECT * FROM orderdetails"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}

const admin = (req,res)=>{
    var sql = "SELECT * FROM admin"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}




const cart = (req,res)=>{
    var sql = "SELECT * FROM cart"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
            })
        }
    })
    
}
const vender = (req,res)=>{
    var sql = "SELECT * FROM tbl_vender"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list:rows
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
    orderdetails1,
    ordertab,
    getImport,
    getImportdetails,
    admin,
    cart,
    vender
}