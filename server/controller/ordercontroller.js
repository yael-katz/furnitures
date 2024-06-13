const Order = require("../models/Order")
const Product = require("../models/Product")
const User=require('../models/User')
const mongoose = require('mongoose')

const getAllOrders = async (req,res) => {
    if(req.user.role==='admin'){
        const orders = await Order.find().lean()
        if (!orders?.length)
            return res.status(400).json("not found order")
        return res.json(orders)
    }
    else{
        const orders = await Order.find({user:req.user._id}).lean()
        if (!orders?.length)
            return res.status(400).json("not found order") 
        return res.json(orders)

    }
}



const createNewOrder = async (req,res) => { 
    const { products } = req.body
    if (!products) {
        return res.status(400).json("fiellds are required")
    }
let price=0;
for (const product of products) {
    const validProductId =new mongoose.Types.ObjectId(product.prod._id);
    const chngQty =await Product.findById(new mongoose.Types.ObjectId(validProductId)).exec()
    if(chngQty.qty - product.qty<0)
        return res.status(400).json({message:chngQty.name+" out of stock"})
}


for (const product of products) {
    const validProductId =new mongoose.Types.ObjectId(product.prod._id);
    const chngQty =await Product.findById(new mongoose.Types.ObjectId(validProductId)).exec()
    chngQty.qty -= product.qty
    price+=product.prod.price*product.qty;
    const myUpdateproduct = await chngQty.save()
}

  
    const ordDate= Date.now() 
    const order = await Order.create({ user:req.user,products, price,ordDate,status:0 })

    const user=await User.findById(req.user._id)
    products.map(prod=>{
        user.cart=user.cart.filter(cart=>cart.prod!=prod._id&&cart._id!=prod._id)
    })
    const updadeUser=await user.save()
    res.json(order)
}

const getOrderById = async (req,res) => {
    const {_id} = req.params
    const order = await Order.findById({_id}).lean()
    if (!order) {
        return res.status(400).json(" not found order")
    }
    res.json(order)
}



module.exports = {
    getAllOrders,
    createNewOrder,
    getOrderById
}