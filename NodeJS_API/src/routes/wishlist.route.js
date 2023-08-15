
const contrl = require("../controllers/wishlist.controller")
const wishlist = (app) => {
    app.get("/api/wishlist/get-list/:id",contrl.getList)
    app.get("/api/wishlist/get-one/:id",contrl.getOne)
    app.get("/api/wishlist/order",contrl.ordertab)
    app.get("/api/wishlist/orderd",contrl.orderdetails1)
    app.get("/api/wishlist/import", contrl.getImport)
    app.get("/api/wishlist/importd", contrl.getImportdetails)
    app.post("/api/wishlist/create",contrl.create)
    app.put("/api/wishlist/update",contrl.update)
    app.delete("/api/wishlist/remove/:id",contrl.remove)
    app.get("/api/wishlist/cart",contrl.cart)
    app.get("/api/wishlist/admin",contrl.admin)
    app.get("/api/wishlist/vender",contrl.vender)
}
module.exports = wishlist