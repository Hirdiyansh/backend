const express = require("express");
const router = express.Router();
const User = require("../models/Register");
const { body, validationResult } = require('express-validator');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='yourname@123456#';
//api for regestering data
router.post("/createuser",[body('name','Please Enter Valid Name of minimum 3 length').isLength({min:3}),body('email','Please Enter valid Email').isEmail(),body('password','Enter valid password which contain special characters upper case and lower case and minimum of 8 length').isLength({min:8}),body('phone','Enter valid phone number of 10 digits').isLength({min:10,max:10}),body('subsc','Please enter valid plan')],async(req,res)=>{
    const{name,phone,email,password,subsc}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(),success:false});
    }
    else{
    let a =new User({name,phone,email,password,subsc});
    await a.save();
    const data={
        a:{
            id:a._id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken,success:true});
    // return res.status(200).send({success:true});
    }
});
//api for login of user and fetching user details.
router.post("/login" , async (req, res) => {
        
    const { email, password} = req.body;
    let u = await User.findOne({email : email});
    if(u===null)
    {
        return res.status(400).send({success:false,error:"User not registered please enter valid email"});
        // res.status(400).send({success:false});
    }
    if(email===u.email && u.password===password){
        const data={
            a:{
                id:u._id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken,success:true});
       
        // console.log(req.body);
        // res.status(200).send({success:true});
    }
    if(email===u.email && u.password!=password)
    {
        return res.status(400).send({success:false,error:"Your crdentials are wrong check your password"});
        // res.status(400).send({success:false});
    }  
}
);

//? api for fetching information of logging person
router.get('/userdetails',fetchuser,async (req, res) => {
try{
    const userId=req.user.id;
    console.log(userId);
    const user=await User.findById(userId).select("-password")
    if(!user){
        res.status(500).send("User not found");
    }
    console.log(user);
    res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
}
})

//update an existing customer
router.put('/update/:id',fetchuser,async(req,res)=>{
const {name,phone,email}=req.body;
const newUser={};
if(name){
    newUser.name=name;
}
if(phone){
    newUser.phone=phone; 
}
if(email){
    newUser.email=email;
}
let uuser=await User.findById(req.params.id);

if(!uuser){
    return res.status(404).send("Not found");
}
if(uuser.user && uuser.user.toString()!==req.user.id)
{
     return res.status(401).send("Not allowed");
}
uuser= await User.findByIdAndUpdate(req.params.id,{$set:newUser},{new:true})
res.json({uuser});
})
module.exports=router;