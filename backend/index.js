require("./db/mongo");
const {PORT} = require("./utils/config")
const express = require("express");
const app = express();
const cors = require("cors");
const {handlerNotFound, handlerError, logger} = require("./utils/middleware")
// const personasRouter = require("./routes/personasRouter");
const mascotaRouter = require("./routes/mascotaRouter");
const tipoRouter = require("./routes/tipoRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

app.use(express.json());

app.use(logger);

app.use("/api/login", loginRouter);

app.use("/api/mascotas",mascotaRouter);

app.use("/api/tipos",tipoRouter);


app.use("/api/users",userRouter);

app.use(handlerNotFound);

app.use(handlerError);



app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`)
});