const express = require("express")
const router = express.Router()
const orderController=require("../controller/ordercontroller")
const verifyJWT=require("../middleware/verifyJWT")
router.use(verifyJWT)

router.get("/",orderController.getAllOrders)
router.get("/:_id",orderController.getOrderById)
router.post("/",orderController.createNewOrder)
module.exports=router