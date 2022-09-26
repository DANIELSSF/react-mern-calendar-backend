//* Importaciones
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//*Crear servidor de express 
const app = express();

//*Conexión a la base de datos
dbConnection();

//* Cors
app.use(cors());

//* Directorio publico
app.use(express.static('public'));

//* Parsear objetos de json
app.use(express.json());


//* Rutas
// TODO: Rutas para el auth
app.use("/api/auth", require("./routes/auth"));

//TODO: Rutas para los eventos
app.use("/api/events", require("./routes/events"));

//* Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server running in the port ${process.env.PORT}`);
});