const contrl = require("../controllers/register.controller")
const register = (app)=>{
    app.post("/api/register/create",contrl.create)
    app.post("/api/register/customer",contrl.customerregister)
}
module.exports = register