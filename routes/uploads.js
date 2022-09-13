/**
 * Ruta
 * /api/upload/
 */

 const { Router } = require("express"); 
const { fileUpload, retornaImagen } = require("../controllers/uploads");
 const { validarJwt } = require("../middlewares/validar-jwt");
 const expresFileUpload = require('express-fileupload');
 
 
 
 const router = Router();

 router.use(expresFileUpload());
 //Subir Imagen
 router.put('/:tipo/:id', validarJwt, fileUpload)
 
 //Obtener imagen
 router.get('/:tipo/:foto', retornaImagen) 
 
 
 module.exports = router;