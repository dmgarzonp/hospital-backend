//getTodo

const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Enfermera = require('../models/enfermera');



const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales, enfermeras] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Enfermera.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
        enfermeras

    });
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospita.find({ nombre: regex })
                                .populate('usuario', 'nombre img')

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        case 'enfermeras':
            data = await Enfermera.find({ nombre: regex })
                                  .populate('usuario', 'nombre img')
                                  .populate('hospital', 'nombre img');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene queser Medicos/ hospitales / usuarios'
            })          
    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}