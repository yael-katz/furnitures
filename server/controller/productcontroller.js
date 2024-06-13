const Product = require("../models/Product")
const Enum=['table','desk','bed','sofa','chair']
const getAllProducts = async (req,res) => {
    const products = await Product.find({}).lean()
    if (!products?.length)
        return res.status(400).json("not found product")
    res.json(products)
}

const createNewProduct = async (req,res) => { 
    if(req.user.role==='admin'){
        const { name,code, image, category ,description,price,qty} = req.body

        if (!name||!code|| !category||!price||!qty) {
            return res.status(400).json("fiellds are required")
        } 

        if(!Enum.find(e=>e===category))
            return res.status(400).json(` category must be one of: ${Enum.map(e=>e)}`)
        const productarr = await Product.find().lean()
        let arr=productarr.map(u=>u.code===code)
        if((arr).find(a=>a===true)){
            return res.status(400).json("you already have such product code")
        }
        const product = await Product.create({ name,code,description, image, category ,price,qty})
        res.json(product)
    }
    else
        return res.status(401).json({message:'not athourized to craete product'})
}

const getProductById = async (req,res) => {
    const {_id} = req.params
    const product = await Product.findById({_id}).lean()
    if (!product) {
        return res.status(400).json(" not found product")
    }
    res.json(product)
}

const updateProduct = async (req,res) => {
    if(req.user.role==='admin'){

        const { _id, name,code, image, category ,description,price,qty}= req.body
        if (!_id||!name||!code|| !category||!price||!qty) {
            return res.status(400).json("fiellds are required")
        } 
        const product = await Product.findById(_id).exec()
        if (!product)
            return res.status(400).json(" product not found")
        product.name = name
        product.description=description
        product.code = code
        product.image = image
        product.category = category
        product.price = price
        product.qty = qty
        const myUpdateproduct = await product.save()
        res.json(myUpdateproduct)
    }
    else
        return res.status(401).json({message:'not athourized to update product'})
}

const updateProdQty = async (req,res) => {
    if(req.user.role==='admin'){
        const {_id}=req.params
        const { qty} = req.body
        if (!qty)
            return res.status(400).json("quantity is required")
        const product = await Product.findById(_id).exec()
        if (!product)
            return res.status(400).json(" product not found")
        product.qty = qty
        const myUpdateproduct = await product.save()
        res.json(myUpdateproduct)
    }
    else
        return res.status(401).json({message:'not athourized to update product'})
}
const deleteProduct = async (req,res)=> {
    if(req.user.role==='admin'){

    const {_id}=req.params
    
    const product=await Product.findById(_id).exec()

    if(!product)
        return res.status(400).json(" not found product")
    const result=await product.deleteOne()
    res.json(result)
    }
    else
        return res.status(401).json({message:'not athourized to delete product'})
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProdQty
}