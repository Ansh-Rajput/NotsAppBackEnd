const express = require("express");
const connectToMongo = require("./db.js");

connectToMongo();

const app = express();
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

