const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    obj = {
        name:"Ansh Rajput",
        Age:19
    }
    
    res.json(obj);
})

module.exports = router;