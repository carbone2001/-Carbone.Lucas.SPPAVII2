const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const mascotaSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true,
    },
    tipo:{
        type:String,
        required:true,
    },
    vacunado:{
        type:Boolean,
        required:true,
    },
    observaciones:{
        type:String,
        default:""
    }
});

//Cambiar _id por id y quitar __v
mascotaSchema.set("toJSON", {
    transform:((document, documentToJSON) => {
        documentToJSON.id = documentToJSON._id.toString();
        delete documentToJSON._id;
        delete documentToJSON.__v;
    })
})

//El model se le pasa el nombre (SINGULAR) y el schema creado
const Mascota = model("Mascota", mascotaSchema);

module.exports = Mascota;