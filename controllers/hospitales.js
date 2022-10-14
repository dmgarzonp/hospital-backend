const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre");

  res.json({
    ok: true,
    hospitales,
  });
};

/**
 * Creay Hospital nuevo
 */

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      msg: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};



/**
 * Eliminar Hospital 
 */

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encomntrado por id",
      });
    }

    const cambioHospital = {
        ...req.body,
        usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, { new: true })

    res.json({
        ok: true,        
        hospital: hospitalActualizado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};


/**
 * Eliminar el Hospital
 */
const eliminarHospital = async(req, res = response) => {

  const id = req.params.id;  

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encomntrado por id",
      });
    }

    await Hospital.findByIdAndDelete( id );
       
    res.json({
        ok: true,        
        msg: 'Hospital eliminado con exito'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};



module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
