const express = require("express");
const router = express.Router();
const Posture = require("../models/Posture");
 
router.post("/posture",async(req,res)=>{
    const{title,desc,img}=req.body;
    let a =new Posture({title,desc,img});
    await a.save();
    res.status(200).send({success:true});
});

router.get("/showposture",async(req,res)=>{
    const result=await Posture.find();
    console.log(result);
    res.send({result});
})
module.exports = router;
