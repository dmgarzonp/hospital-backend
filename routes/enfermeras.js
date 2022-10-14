/**
 * Rustas
 * Enfermeras
 * ruta: '/api/enfermeras'
 * Ejmp: router.get('/', getEnfermeras);
 */

const { Router } = require('express');
const { check } = require('express-validator')
const {
    getEnfermeras,
    crearEnfermera,
    actualizarEnfermera,
    eliminarEnfermera
} = require('../controllers/enfermeras');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');



const router = Router();

//Obtener listado de enfermeras
router.get('/', getEnfermeras);


//Crear enfermera
router.post('/',[
    validarJwt,
    check('nombre', 'El nombre de enfermera es requerido').not().isEmpty(),
    check('hospital', 'La enfermera ID debe ser valido').isMongoId(),
    validarCampos
], crearEnfermera);

//actualizar enfermera
router.put('/:id',
[
    validarJwt,
    check('nombre', 'El nombre de enfermera es requerido').not().isEmpty(),
    check('hospital', 'La enfermera ID debe ser valido').isMongoId(),
    validarCampos
] ,actualizarEnfermera

);





//rutas para eliminar enfermera 
router.delete('/:id',  validarJwt, eliminarEnfermera);


module.exports = router;

