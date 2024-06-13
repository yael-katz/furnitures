const express=require("express")
const router=express.Router()
const userController=require('../controller/usercontroller')
const verifyJWT=require("../middleware/verifyJWT")
router.use(verifyJWT)

router.get("/",userController.getAllUsers)
router.get("/cart",userController.getCart)
// router.get("/user",userController.getUser)
router.get("/:_id",userController.getUserById)
router.post("/",userController.createNewUser)
router.put("/addToCart",userController.addToCart)

router.delete("/:_id",userController.deleteUser)
router.put("/",userController.updateUser)
module.exports=router