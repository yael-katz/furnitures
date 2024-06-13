const mongoose = require("mongoose")
const product = require("./Product")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ['custumer', 'admin'],
        default: 'custumer'
    },
    cart: {
        type: [{
            prod: {
                type: mongoose.Schema.Types.ObjectId,
                ref: product
            },
            qty: Number
        }],
        default: []
    }


})
module.exports = mongoose.model('User', userSchema)