/**
 * Hospitales
 * ruta: '/api/hospitales'
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
} = require("../controllers/hospitales");

const router = Router();

//Retorna todos los hospitales
router.get("/", getHospitales);

//Crear hospital
router.post("/",[
  validarJwt,
  check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
  validarCampos
], crearHospital);


//Actualizar hospital
router.put("/:id",
[
  validarJwt,
  check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
  validarCampos

], 
actualizarHospital

);



//Eliminar hospital
router.delete("/:id", 
              validarJwt,
              eliminarHospital

);

module.exports = router;

