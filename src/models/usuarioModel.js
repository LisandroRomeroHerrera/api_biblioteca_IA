// usuarioModel.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  // Otros campos que desees
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;