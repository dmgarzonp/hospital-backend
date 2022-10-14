/**
 * Controlador Enfermeras
 */

const { response } = require("express");
const Enfermera = require('../models/enfermera');
const medico = require("../models/medico");




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

/**
 * **************************
 * ACTUALIZAR ENFERMERA
 * **************************
 */
const actualizarEnfermera = async( req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        //BUscar enfermera por id
        const enfermera = await Enfermera.findById( id );

        //comprobar si la enfermera existe 
        if (!enfermera) {
            return res.status(404).json({
                ok: false,
                msg: 'Enfermera no encontrada'
            });
        }

        //campos a ser actualizados
        const cambiosEnfermera = {
            ...req.body,
            usuario: uid
        }

        //Actualizar enfermera
        const enfermeraActualizada = await Enfermera.findByIdAndUpdate(id, cambiosEnfermera, {new: true});
        res.json({
            ok: true,
            msg: enfermeraActualizada
        });
        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrado'
        })
    }
   
};

/**
 * **************************
 * ELIMINAR MEDICO
 * **************************
 */

const eliminarEnfermera = async( req, res = response) => {

    //Obtener id de enfermera
    const id = req.params.id;

    try {
        //Buscar enfermera por id
        const enfermera = await Enfermera.findById( id );

        if (!enfermera) {
            return res.status(404).json({
                ok: false,
                msg: 'Enfermera no encontrada'
            });
        }

        //Borrar enfermera 
        await Enfermera.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Enfermera  eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el madministrador'
        })
    }

    
};

module.exports = {
    getEnfermeras,
    crearEnfermera,
    actualizarEnfermera,
    eliminarEnfermera
}