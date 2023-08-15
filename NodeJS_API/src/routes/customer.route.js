const multer = require("multer")
const { upload } = require('../util/service')
// const image_path = "C:/xampp/htdocs/image_path/ecm_backend_g1/"
// const storage = multer.diskStorage({
//     destination : function (req,file,callback){
//         callback(null,image_path)
//     },
// })
// const upload = multer({
//     storage : storage,
//     limits : {
//         fileSize : 1024*1024*3
//     }
// })
// arrow function

const customerController = require("../controllers/customer.controller")
const customer = (app) => {
    app.post("/api/customer/profile",customerController.profileCustomer)
    app.get("/api/customer/get-list",customerController.getList)
    app.get("/api/customer/cucount",customerController.CountCustomer)
    app.get("/api/customer/orcount",customerController.CountOrder)
    app.get("/api/customer/recount",customerController.CountRevenue)
    app.get("/api/customer/stockin",customerController.CountStockIn)
    app.get("/api/customer/stockout",customerController.CountStockOut)
    app.post("/api/customer/create",customerController.create)
    app.post("/api/customer/upload-image",upload.single("myfile"),customerController.uploadImage)
    app.post("/api/customer/login",customerController.login)
    app.put("/api/customer/update",upload.single("myfile"),customerController.update)
    app.get("/api/customer/get-cart",customerController.getCart)
    app.delete("/api/customer/delete/:id",customerController.remove)
    app.get("/api/customer/byid/:id",customerController.getCustomerByID)
    app.get("/api/customer/byday",customerController.getByDay)
    app.get("/api/customer/bymonth",customerController.getByMonth)
}


module.exports = customer
