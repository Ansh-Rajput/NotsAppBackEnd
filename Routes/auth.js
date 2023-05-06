
const express = require("express");
require('dotenv').config();
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require("../MiddleWare/fetchUser");

const { body, validationResult } = require('express-validator');


const User = require("../Models/User");

//Route to create a new User.
router.post("/createUser",[
    body("name","Enter name of length minium 3.").isLength({min:3}),
    body("email","Entering eamil is  necessary").isEmail().custom(async value => {
        const user = await User.findOne({email:value});
        console.log(user);
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    body("password","Enter password of length minium 5.").isLength({min:5})
],async (req,res)=>{
    let status = false;
    const result = validationResult(req);
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    if (result.isEmpty()) {
        const userData = User({...req.body,password:secPass});
        userData.save();
        const data = {
          user:{
            id:userData.id
          }
        }
        const token = jwt.sign(data,process.env.PRIVATEKEY);
        // console.log(token);
        // console.log(req.body);
        status = true;
        res.json({token,status});
    }
    else{
      res.json({error:"Not a Valid Input.",status:status})
    }
})

//Route to login user.

router.post("/login",[
  body("email","Entering eamil is  necessary").isEmail(),
  body("password","Enter password of length minium 5.").isLength({min:5})
],async (req,res)=>{
  let status = false;
  const result = validationResult(req);
  const {email,password} = req.body;
  if (result.isEmpty()) {
      const user = await User.findOne({email:email});
      if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
          const data = {
            user:{
              id:user.id
            }
          }
          const token = jwt.sign(data,process.env.PRIVATEKEY);
          console.log(token);
          status=true;
          res.json({token,status});
        }
      }
      else{
        res.json({error:"Not a Valid Input."})
      }
  }
  else{
    res.json({error:"Not a Valid Input.",status:status})
  }
})

//Route to fetch User Details.

router.post("/fetchUser",fetchUser,async (req,res)=>{
  try {
    const userDetail = await User.findById(req.user.id);
    console.log(userDetail);
    res.json({userDetail});
  } 
  catch (error) {
    res.json({error:error.message});
  }
})

module.exports = router;