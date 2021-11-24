const {connect} = require("mongoose");
const {DB_URI} = require("../utils/config")

const conectarBD = async () =>{
    //console.log("DB URI",process.env.DB_URI)
    connect(DB_URI)
}

conectarBD()
.then(()=>{
    console.log("DB Conectada")
})
.catch((err)=>{
    console.log("Error al conectar a la BD",err);
})