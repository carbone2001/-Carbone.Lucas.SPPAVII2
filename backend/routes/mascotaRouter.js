const Mascota = require("../models/Mascota");
const { verifyToken } = require("../utils/middleware");
const mascotasRouter = require("express").Router();

// mascotasRouter.get("/",verifyToken,(req,res,next)=>{
mascotasRouter.use(verifyToken);

mascotasRouter.get("/",(req,res,next)=>{
    Mascota.find({}).then((mascotas)=>{
        res.json(mascotas);
    })
    .catch((err)=>{
        next(err)
    })
})

mascotasRouter.get("/:id",({params},res,next)=>{
    Mascota.findById(params.id)
    .then((mascota)=>{
        if(mascota){
            res.json(mascota);
        }
        else{
            res.status(404).send({error: "ID Invalido"});
        }
    })
    .catch(err => {
        next(err)
    })
})

mascotasRouter.delete("/:id",({params},res,next)=>{
    const id = params.id;
    Mascota.findByIdAndRemove(id)
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

mascotasRouter.post("/",(req,res,next)=>{
    console.log("body agregar mascota: ",req.body)
    const { nombre, edad, tipo, vacunado, observaciones } = req.body;
    const nuevaMascota = new Mascota({
        nombre,
        edad,
        tipo,
        vacunado,
        observaciones
    });
    nuevaMascota.save()
    .then(mascota => {
        res.json(mascota);
    })
    .catch((err) => {
        next(err);
    })
})

mascotasRouter.put("/:id",(req,res, next)=>{
    const id = req.params.id;
    const {nombre, edad, tipo, vacunado, observaciones} = req.body;
    const infoMascota = {nombre, edad};

    if(nombre){
        infoMascota.nombre = nombre;
    }
    if(edad){
        infoMascota.edad = edad;
    }
    if(tipo){
        infoMascota.tipo = tipo;
    }
    if(vacunado != undefined){
        infoMascota.vacunado = vacunado;
    }
    if(observaciones){
        infoMascota.observaciones = observaciones;
    }

    Mascota.findByIdAndUpdate(id, infoMascota,{new:true})
    .then(mascota => {
        if(mascota){
            res.json(mascota);
        }
        else{
            res.status(400).end();
        }
    })
    .catch(err => {
        next(err)
    });
})

module.exports = mascotasRouter;