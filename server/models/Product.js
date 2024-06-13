const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:'images/chairs/1.png'
    },
    category:{
        type:String,
        enum:['table','desk','bed','sofa','closet','chair'],
        required:true,
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true
    }
    
})
module.exports=mongoose.model('Product',productSchema)