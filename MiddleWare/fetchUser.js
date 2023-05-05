
const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req,res,next)=>{
        const KEY = process.env.PRIVATEKEY;
        console.log(KEY);
        const token = req.headers["auth-token"];
        console.log(req.headers);
        const data = jwt.verify(token,KEY);
        console.log(data);
        req.user = data.user;
        console.log("object4");
        console.log(req.user);
        next();
}

module.exports = fetchUser;