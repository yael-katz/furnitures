const mongoose=require("mongoose")
const product = require("./Product")
const user = require("./User")

const orderSchema=new mongoose.Schema({

    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    products:{
        type:[{
            prod:mongoose.Schema.Types.ObjectId,
            qty:Number
        }],
        required:true,
        ref:product
    },
    ordDate:{
        type:mongoose.Schema.Types.Date,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        default:0,
    },

    
})
module.exports=mongoose.model('Order',orderSchema)