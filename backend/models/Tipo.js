const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const tipoSchema = new Schema({
    descripcion:{
        type:String,
        required:true
    }
});

//Cambiar _id por id y quitar __v
tipoSchema.set("toJSON", {
    transform:((document, documentToJSON) => {
        documentToJSON.id = documentToJSON._id.toString();
        delete documentToJSON._id;
        delete documentToJSON.__v;
    })
})

const Tipo = model("Tipo", tipoSchema);

module.exports = Tipo;