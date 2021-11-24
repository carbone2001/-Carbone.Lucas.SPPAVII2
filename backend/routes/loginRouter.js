const User = require("../models/User");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../utils/config");
loginRouter.post("/",async (req,res,next)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        //console.log(user.passwordHash,password);
        const correctPass = user === null ? false : await bcrypt.compare(password, user.passwordHash);
        if(!(user && correctPass)){
            return next({error:"validationError", message:"El password o el username son invalidos"})
        }
        const userToken = {
            username: user.username,
            id: user.id
        }
        const token = await jwt.sign(userToken, SECRET, {expiresIn:"60s"});
        res.status(200).json({
            token,
            username
        })
    }
    catch(err) {
        console.log(err)
        next(err);
    }
})


module.exports = loginRouter;