const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/NoteApp2";

const connectToMongo = ()=>{
    mongoose.connect(uri);
}

module.exports = connectToMongo;