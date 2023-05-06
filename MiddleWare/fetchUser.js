const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req,res,next)=>{
        try {
                const KEY = process.env.PRIVATEKEY;
                console.log(KEY);
                const token = req.headers.authtoken;
                const token1 = JSON.parse(token);
                console.log(token1);
                const data = jwt.verify(token1,KEY);
                console.log(data);
                req.user = data.user;
                console.log("object4");
                console.log(req.user);
                next();
                
        } catch (error) {
                res.send({error:error.message});
        }
}

module.exports = fetchUser;

// const JWT_SECRET = process.env.PRIVATEKEY;

// const fetchuser = (req, res, next) => {
//     // Get the user from the jwt "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NGFiMjUyZWQyNDllZGE5ZDMxOGI0In0sImlhdCI6MTY4MzI3ODAxN30.Po5LwADqDgMDpQNjjI4hpNA2CxCqJiKxuWHlRlx0mo8" and add id to req object
//     const token = req.header('authtoken');
//     console.log(token);
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = fetchuser;