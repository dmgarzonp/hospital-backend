/**
 * Controlador para medico
 */
const { response } = require("express");
const Medico = require("../models/medico");

/**
 * **************************
 * OBTENER LISTADO DE MEDICOS
 * **************************
 */
const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medicos
    })
};

/**
 * **************************
 * CREAR MEDICO NUEVO
 * **************************
 */

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


/**
 * **************************
 * ACTUALIZAR MEDICO
 * **************************
 */
const actualizarMedico = async(req, res = response) => {

    const id = req.params.id; //Obtener id de Medico
    const uid = req.uid; // Obtener ID de usuario

    try {
        //Buscar por ID al medico
        const medico = await Medico.findById( id );


        //Comprobar si el medico existe
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        //Campos a ser cambiados
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }

        //actualizar medico
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new: true});
        res.json({
            ok: true,
            msg: medicoActualizado
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

const eliminarMedico = async(req, res = response) => {

    //Obtener id de Medico
    const id = req.params.id;

    try {
        //Buscar medico 
        const medico = await Medico.findById( id );

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }

        //Borrar el medico
        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}
