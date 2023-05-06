const express = require("express");
const connectToMongo = require("./db.js");
const cors = require('cors');
const app = express();

app.use(cors());

connectToMongo();

const port = 5000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hellow World!");
})
app.use("/api/auth",require("./Routes/auth.js"));
app.use("/api/note",require("./Routes/notes.js"));

app.listen(port,()=>{
    console.log("localhost:5000");
})

