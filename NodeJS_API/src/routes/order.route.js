const contrl = require("../controllers/order.contoller")
const order = (app) => {
    app.get("/api/order/get-list",contrl.getList)
    app.get("/api/order/get-one",contrl.getOne)
    app.post("/api/order/create",contrl.create)
    app.put("/api/order/update",contrl.update)
    app.delete("/api/order/remove",contrl.remove)
    app.get("/api/order/detail/:id",contrl.getOrderDetail)
    app.post("/api/order/dd",contrl.getByDay)
    app.post("/api/order/month",contrl.getByMonth)
    app.post("/api/order/historya",contrl.historyOrder1)
    app.post("/api/order/report",contrl.ReportByMonth)
    
}
module.exports = order