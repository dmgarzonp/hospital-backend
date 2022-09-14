const express = require('express');
require('dotenv').config(); // Leer variables de entorno
const cors = require('cors');


const { dbConnection } = require('./database/config');
const { use } = require('./routes/usuarios');

//Crear el servidor Express
const app = express();

//Configurar los cors- accesos desde cualquier dominio
app.use(cors());

//Carpeta publica
app.use( express.static('public'));

//Lectura y parseo del Body
app.use(express.json());

// LLamado a la base de datos 
dbConnection();

//console.log(process.env);

//RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/enfermeras', require('./routes/enfermeras'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));




//Levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});


