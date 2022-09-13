/**
 * Medicos
 * ruta: '/api/medicos'
 */

const { Router } = require('express');
const { check } = require("express-validator");
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router = Router();


//Retornar todos los medicos
router.get('/', getMedicos);

//Crea un medico
router.post('/',[
    validarJwt,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospita ID debe ser valido').isMongoId(),
    validarCampos
], crearMedico);

//Actualizar un medico
router.put('/:id', actualizarMedico);

//Elimina un medico
router.delete('/:id', eliminarMedico);

module.exports = router;



