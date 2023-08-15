
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")


const getList = (req,res) => {
    var sql = "SELECT * FROM pic"
    var query = req.query
   
    db.query(sql,(error,rows)=>{
        if(!error){
            res.json({
                list: rows,
                param : req.query
            })
        }else{
            res.json({
                error: true,
                message : error
            })
        }
    })
}


const create = (req,res) => {
    var {model,image} = req.body
    var message = {}
   
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }

    var image = null 
    if(req.file?.filename){
        image = req.file?.filename
    }

    var sql = "INSERT INTO `pic`(`model`, `image`) VALUES (?,?)"
    db.query(sql,[model,image],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Table pic has been insert success!",
            })
        }
    })
}
const update = (req,res) => {
    var {id,model,description,parent_id,create_by} = req.body
    var message = {}
   
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }

    var image = null 
    if(req.file.filename){
        image = req.file?.filename
    }
    
    var sql = "UPDATE `category` SET `model` = ?, `image` = IFNULL(?, `image`) WHERE id = ?";
    db.query(sql,[model,image, id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Category update success!",
            })
        }
    })
}


module.exports = {
    getList,
   
    create,
    update,
   
}