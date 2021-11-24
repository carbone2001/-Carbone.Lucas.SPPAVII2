const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    }
});

//Cambiar _id por id y quitar __v y no devolver password
userSchema.set("toJSON", {
    transform:((document, userToJSON) => {
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.__v;
        delete userToJSON.passwordHash;
    })
})

module.exports = model("User", userSchema);