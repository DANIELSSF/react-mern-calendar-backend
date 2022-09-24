const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('Conectado a la BD');

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la base de datos');
    }

}

module.exports = {
    dbConnection,
}