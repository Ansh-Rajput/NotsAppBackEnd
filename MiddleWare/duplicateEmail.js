const User = require("../Models/User");


const duplicateEmail = async (req,res,next) =>{
    const email = req.body.email;
    const user = await User.findOne({email:email});

    if(user){
        res.stauts(404).send("User Alredy Exist.");
    }

    next();
}

module.exports = duplicateEmail;