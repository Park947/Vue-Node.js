//引入mongoose
const mongoose = require("mongoose");
//实例化一个Schema
const Schema = mongoose.Schema;

//创建一个Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    identity:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model("users",UserSchema);