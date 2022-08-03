const express = require('express');
require('dotenv').config(); // Leer variables de entorno
const cors = require('cors');


const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar los cors- accesos desde cualquier dominio
app.use(cors());

// LLamado a la base de datos 
dbConnection();

//console.log(process.env);

//RUTAS
app.get('/', (req, resp) => {
    resp.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})



//Levantar el servidor
app.listen(process.env.PORT, () => {

    console.log('Servidor corriendo en puerto' + process.env.PORT);
});


