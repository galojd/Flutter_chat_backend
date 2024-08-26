const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response) => {

    const desde = Number(req.query.desde) || 0; //captura el numero que mando desde la url
    
    const usuarios = await Usuario
        .find({ _id : { $ne: req.uid}})//de esta forma retorna todos los id que no sean el id utilizado
        .sort('-online')
        .skip(desde)
        .limit(20);//me envia de 20 registros


    res.json({
        ok: true,
        usuarios,
        desde
    })

}

module.exports = {
    getUsuarios
}