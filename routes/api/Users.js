//@login & rehister
const express = require("express");
const router = express.Router();
//引入加密内容
const bcrypt = require("bcrypt");
//引入gravatar
const gravatar = require("gravatar");
//引入jsonwebtoken
const jwt = require("jsonwebtoken");

//引入User
const User = require("../../models/User");
//引入key
const key = require("../../config/key");
//引入passport
const passport = require("passport");

//route GET请求 
//@desc 返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})

//route POST请求 
//@desc 返回的请求的json数据
// @access public
router.post("/register",(req,res) => {
    // console.log(req.body)
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
    .then((user) => {
        if(user){
            return res.status(400).json("邮箱已被注册！")
        }else{
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
                identity:req.body.identity
            })

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // 判断当前是否有错误
                    if(err) throw err;

                    //hash是加密后的密码
                    newUser.password = hash;

                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })

})

//route POST请求 login
//@desc 返回 token jwt passport
// @access public
router.post("/login",(req,res) => {
    const email= req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json("用户不存在")
            }else{
                //密码匹配
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const rule = {
                                id:user.id,
                                name:user.name,
                                avatar:user.avatar,
                                identity:user.identity
                            };
                            //jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule,key.secretOrKey,{expiresIn:3600},(err,token) => {
                                if(err) throw err;
                                else{
                                    res.json({
                                        success:true,
                                        token:"Bearer "+token
                                    });
                                }                               
                            })                           
                        }else{
                            return res.status(400).json("密码错误");
                        }
                    })
            }
        })
})

//route POST请求 current
//@desc return current user
// @access Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.email,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})

module.exports = router;