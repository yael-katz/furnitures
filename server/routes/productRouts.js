const express=require("express")
const router=express.Router()
const productController=require('../controller/productcontroller')
const verifyJWT=require("../middleware/verifyJWT")

router.get("/",productController.getAllProducts)

router.use(verifyJWT)

router.get("/:_id",productController.getProductById)
router.post("/",productController.createNewProduct)
router.delete("/:_id",productController.deleteProduct)
router.put("/",productController.updateProduct)
router.put("/:_id",productController.updateProdQty)
module.exports=router