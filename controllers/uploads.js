const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  //Validar tipo
  const tiposValidos = ["medicos", "hospitales", "usuarios", "enfermeras"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, hospita, usuario o enfermera conosido ",
    });
  }

  //Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo seleccionado",
    });
  }

  //Procesar la imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split(".");
  const extecionArchivo = nombreCortado[nombreCortado.length - 1];

  //Validar extesion
  const extensionValida = ["png", "jpg", "jpeg", "gif"];
  if (!extensionValida.includes(extecionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extesion de archivo valida ",
    });
  }

  //Generar el nombre del Archivo
  const nombreArchivo = `${uuidv4()}.${extecionArchivo}`;

  //Crear path donde se guarda la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // para mover la imagen a la carpeta que sea
  file.mv(path,  (err) =>  {
    if (err) {
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg: 'Erro al mover la imagen'
        })        
    }

    //Actualizar base de datos
    actualizarImagen( tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg: 'archivo subido',
        nombreArchivo,
      });
  });

 
};


const retornaImagen = (req, res = response) => {

  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //Imagen por defecto 
if (fs.existsSync(pathImg)) {
  res.sendFile(pathImg);  
} else {
  const pathImg = path.join(__dirname, `../uploads/no_imagen.jpg`);
  res.sendFile(pathImg); 
}




}

module.exports = {
  fileUpload,
  retornaImagen
};
