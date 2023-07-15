const express = require("express");
const router = express.Router();
const userData = require("../model/user");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//login
router.post("/login", async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const user = await userData.findOne({username:username});
    if(!user){
        res.json({message:"User Not Found!!!"})
    }
    try{
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"hrz",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"})
                }else{
                    res.json({message:"Login successfull",token:token,data:user})
                }
            })
    }
    else{
        res.json({message:"Login Failed"})
    }
}catch (error){

    }
});

//signup api
router.post("/signup", async(req,res)=>{
    try {
        console.log(req.body);
        let item=req.body;
        const newUSer = userData(item);
        await newUSer.save();
        res.json({message:"Registered sucessfully"});
    } catch (error) {
        res.json("Unable to register");    
    }
});
module.exports = router;