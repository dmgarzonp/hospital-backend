/**
 * Ruta: (api/usuarios)
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router = Router();

//Retorna todos los usuarios
router.get('/', validarJwt, getUsuarios);

//Crear usuario
router.post('/', [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'El password es requerido').not().isEmpty(),
       check('email', 'El email es requerido').isEmail(),
       validarCampos
], crearUsuario);


//Actualizar usuario
router.put('/:id', [
       validarJwt,
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El email es requerido').isEmail(),
       check('role', 'El rol es obligatorio').not().isEmpty(),
       validarCampos,
], actualizarUsuario);


//Eliminar usuario
router.delete('/:id',validarJwt, eliminarUsuario);


module.exports = router;