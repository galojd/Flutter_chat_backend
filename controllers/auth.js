const {response} = require("express");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");
const { generrarJWT } = require("../helpers/jwt");

const crearUsuario = async(req, res = response) => {
    
    const {correo, password} = req.body;

    try{
        const existeEmail = await Usuario.findOne({correo});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //se graba en la base de datos
        await usuario.save();

        //Generar mi JWT(JASON WEB TOKEN)
        const token = await generrarJWT(usuario.id);
   
        res.json({
            ok : true,
            usuario,
            token
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }    
}

const login = async (req, res = response) => {
    /*return res.json({
        ok: true,
        msg: 'login'
    })  esto es para devolber el texto como json*/

    const {correo, password} = req.body;

    try{
        const usuarioDB = await Usuario.findOne({correo});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassoword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassoword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        //generar el JWT
        const token = await generrarJWT(usuarioDB.id);

        res.json({
            ok : true,
            usuario: usuarioDB,
            token
        });
        
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se ha detectado un error'
        });

    }    

}

const renewToken = async(req, res = response) => {

    //const uid del usuario
    const uid = req.uid; 

    //generar un nuevo JWT, generarJWT.. uid...
    const token = await generrarJWT(uid);

    //obtener el usuario por el UID, Usuario.findById
    const usuario = await Usuario.findById(uid);


    return res.json({
        ok: true,
        usuario,
        token
    })

}


module.exports = {
    crearUsuario,
    login,
    renewToken
}
    