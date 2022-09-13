/**
 * Controlador Enfermeras
 */

const { response } = require("express");
const Enfermera = require('../models/enfermera');




const getEnfermeras = async (req, res = response) => {

    const enfermeras = await Enfermera.find()
                                       .populate('usuario', 'nombre img')
                                       .populate('hospital', 'nombre img');
    res.json({
        ok: true,
        enfermeras
    })
};

//funcion para crear enfermera 
const crearEnfermera = async ( req, res = response) => {

     //Obtener uid de token 
     const uid = req.uid;

     //desestructurar el body
     const enfermera = new Enfermera({
         usuario: uid,
         ...req.body
     });

    try {
        const enfermeraDB = await enfermera.save();
        res.json({
            ok: true,
            enfermera: enfermeraDB
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    };
    
};

//Funsion para actualizacion
const actualizarEnfermera = ( req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarEnfermera'
    })
};

const eliminarEnfermera = ( req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarEnfermera'
    })
};

module.exports = {
    getEnfermeras,
    crearEnfermera,
    actualizarEnfermera,
    eliminarEnfermera
}