const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect( process.env.BD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('BD EN LINEA');

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de conectarse a la base de datos');
  }
};

module.exports = {
    dbConnection
}