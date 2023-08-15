
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")


const getList = (req,res) => {
    var sql = "SELECT * FROM payment_method"
    db.query(sql,(error,rows)=>{
        if(!error){
            res.json({
                list: rows,
               
            })
        }else{
            res.json({
                error: true,
                message : error
            })
        }
    })
}

module.exports = {
    getList
}