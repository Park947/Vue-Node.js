//引入mongoose
const mongoose = require("mongoose");
//实例化一个Schema
const Schema = mongoose.Schema;

//创建一个Schema
const ProfileSchema = new Schema({    
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Profile = mongoose.model("profile",ProfileSchema);