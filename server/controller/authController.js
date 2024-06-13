const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Enum=['custumer','admin']

const register=async (req,res)=>{
    const {userName,password,name,email,phone,role}=req.body

    if(!userName || !password || !email)
        return res.status(400).json({message:'All fields are required'})
    if(role && !Enum.find(e=>e===role))
        return res.status(400).json(` role must be one of: ${Enum.map(e=>e)}`)
    const foundUser=await User.findOne({userName:userName}).lean()
    if(foundUser)
        return res.status(409).json({message:'duplicate user'})

    const hashpassword = await bcrypt.hash(password,10)
    const userobj= {userName,password:hashpassword,name,email,phone,role}

    const user= await User.create(userobj)
    if(!user)
        return res.status(400).json({message:"not valid user"})
    return res.status(201).json({message:"new user:", user:userName})

}


const login=async (req,res)=>{
    const{userName,password}=req.body
    const foundUser=await User.findOne({userName}).lean()
    if (!userName || !password) 
        return res.status(400).json({message:'All fields are required'})
        
    if(!foundUser)
        return res.status(401).json({message:"Unauthorized"})

    const match= await bcrypt.compare(password, foundUser.password)
    if(!match)
        return res.status(401).json({message:"forbbiden"})
    
    const userInfo= {_id:foundUser._id,name:foundUser.name,
            role:foundUser.role, userName:foundUser.userName,phone:foundUser.phone,
            email:foundUser.email}
    const accesToken= await jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accesToken})

}

module.exports={register,login}