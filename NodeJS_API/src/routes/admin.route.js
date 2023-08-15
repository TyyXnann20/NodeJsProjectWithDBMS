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

const adminController = require("../controllers/admin")
const admin = (app) => {
    app.get("/api/admin/get-list",adminController.getList)
    app.post("/api/admin/create",adminController.create)

    app.post("/api/admin/login",adminController.login)
    app.put("/api/admin/update",adminController.update)
}


module.exports = admin
