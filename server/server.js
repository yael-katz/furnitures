
require("dotenv").config()
const express = require("express")
const app = express()

const cors = require("cors")
const corsOptions = require("./config/corsOptions")

const PORT = process.env.PORT || 2010
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth",require("./routes/authRouter"))
app.use("/api/users",require("./routes/userRouts"))
app.use("/api/products",require("./routes/productRouts"))
app.use("/api/orders",require("./routes/orderRouter"))


mongoose.connection.once('open', () => {
    console.log('connectfd to mongodb')
    app.listen(PORT, () => {
        console.log(`server runinig on port ${PORT}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err);
})

