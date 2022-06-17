//引入express
const express = require("express");
//引入mangoose
const mongoose =  require("mongoose");
//引入body-parser
const bodyParser = require("body-parser");
//引入passport
const passport = require("passport");
//实例化一个app
const app = express();

//引入users.js
const users = require("./routes/api/Users");
//引入profile
const profiles = require("./routes/api/Profiles");

//DB mango
const db = require("./config/key").mangoURI;

//引入body-parser中间件
app.use (bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// connect mangodb
mongoose.connect(db)
        .then(() => console.log("MongonDB connected"))
        .catch(err => console.log(err));

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

//设置路由
// app.get("/",(req,res) => {
//     res.send("Hello World!");
// })

//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

//端口
const port = process.env.PORT || 5000;

//监听
app.listen(port,() => {
    console.log('Server running on port $(port)');
})