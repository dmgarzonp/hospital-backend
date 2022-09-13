/**
 * Controlador para medico
 */
const { response } = require("express");
const Medico = require("../models/medico");


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medicos
    })
};

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoBD = await medico.save();
        res.json({
            ok: true,
            medico: medicoBD
        });       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
    
};

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
};

const eliminarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarMedico'
    })
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}
