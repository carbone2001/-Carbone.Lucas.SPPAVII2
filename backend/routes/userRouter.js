const User = require("../models/User");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/",async (req,res,next)=>{
    try{
        const users = await User.find({});
        res.json(users);
    }
    catch(err) {
        next(err);
    }
})

userRouter.post("/", async (req,res,next)=>{
    try{
        const {username, password} = req.body;

        if(password.length !== 6){
            next({name:"validationError", message:"No tiene 6 caracteres"})
        }

        const saltRouds = 10;//Cantidad de veces que se encripta
        const passwordHash = await bcrypt.hash(password, saltRouds);
        const user = new User({
            username,
            passwordHash
        });
        const userSaved = await user.save();
        res.status(201).json(userSaved);
    }
    catch(err){
        console.log(err)
        next(err);
    }
})

userRouter.get("/:id",({params},res,next)=>{
    User.findById(params.id)
    .then((user)=>{
        if(user){
            res.json(user);
        }
        else{
            res.status(404).send({error: "ID Invalido"});
        }
    })
    .catch(err => {
        next(err);
    })
})

userRouter.delete("/:id",({params},res,next)=>{
    const id = params.id;

    User.findByIdAndRemove(id)
    .then((result)=>{
        if(result){
            res.status(204).end()
        }
        else{
            res.status(404).end();
        }
    })
    .catch(err => {
        next(err);
        //res.status(400).end();
    })
       
})



userRouter.put("/:id",(req,res, next)=>{
    const id = req.params.id;
    const {nombre, edad} = req.body;
    const infoUser = {nombre, edad};

    if(nombre){
        infoUser.nombre = nombre;
    }
    if(edad){
        infoUser.edad = edad;
    }

    //{new:true} para enviar el objeto nuevo
    User.findByIdAndUpdate(id, infoUser,{new:true})
    .then(user => {
        if(user){
            res.json(user);
        }
        else{
            res.status(400).end();
        }
    })
    .catch(err => {
        next(err)
    });
    // updateUser(body) ? res.status(200).end() : res.status(400).end();
})

module.exports = userRouter;