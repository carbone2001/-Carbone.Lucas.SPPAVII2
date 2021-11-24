const Tipo = require("../models/Tipo");
const { verifyToken } = require("../utils/middleware");
const tiposRouter = require("express").Router();

// tiposRouter.get("/",verifyToken,(req,res,next)=>{
tiposRouter.get("/",(req,res,next)=>{
    Tipo.find({}).then((tipos)=>{
        res.json(tipos);
    })
    .catch((err)=>{
        next(err)
    })
})

tiposRouter.get("/:id",({params},res,next)=>{
    Tipo.findById(params.id)
    .then((tipo)=>{
        if(tipo){
            res.json(tipo);
        }
        else{
            res.status(404).send({error: "ID Invalido"});
        }
    })
    .catch(err => {
        next(err)
    })
})

tiposRouter.delete("/:id",({params},res,next)=>{
    const id = params.id;
    Tipo.findByIdAndRemove(id)
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
    })
       
})

tiposRouter.post("/",(req,res,next)=>{
    const { descripcion } = req.body;
    const nuevoTipo = new Tipo({descripcion});
    nuevoTipo.save()
    .then(tipo => {
        res.json(tipo);
    })
    .catch((err) => {
        next(err);
    })
})

tiposRouter.put("/:id",(req,res, next)=>{
    const id = req.params.id;
    const {descripcion} = req.body;
    const infoTipo = {descripcion};

    if(descripcion){
        infoTipo.descripcion = descripcion;
    }

    Tipo.findByIdAndUpdate(id, infoTipo,{new:true})
    .then(tipo => {
        if(tipo){
            res.json(tipo);
        }
        else{
            res.status(400).end();
        }
    })
    .catch(err => {
        next(err)
    });
})

module.exports = tiposRouter;