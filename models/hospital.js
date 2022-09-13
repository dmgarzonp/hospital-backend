const { Schema, model} = require('mongoose');



const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

       img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }   

}, { collection: 'hospitales'}); // Para cambio de nombre de la coleccion de hospital a hospitales

//Para cambiar el _id por el uid de forma visual 
HospitalSchema.method('toJSON', function() {
   const{__v,...object} = this.toObject();   
   return object;
});

module.exports = model('Hospital', HospitalSchema);