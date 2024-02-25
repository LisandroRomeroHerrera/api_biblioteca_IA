const express = require("express");
const mongoose = require('mongoose');
const usuariosRouter = require('./routes/usuarios');
const app = express();

mongoose.connect('mongodb://localhost:27017/api', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(express.json());
app.use('/usuarios', usuariosRouter);

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");


require('dotenv').config();

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion,  librosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
