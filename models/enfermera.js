/**
 * Modelo Enfermera 
 */

const { Schema, model } = require("mongoose");


const EnfermeraSchema = Schema ({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'enfermeras' });

//Para cambiar el _id por el uid de forma visual 
EnfermeraSchema.method('toJSON', function() {
   const{__v,...object} = this.toObject();   
   return object;
});

module.exports = model('Enfermera', EnfermeraSchema);