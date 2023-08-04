/*
    path: api/login
*/

const { Router} = require('express');
const {crearUsuario, renewToken} = require('../controllers/auth');
const {login} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-JWT')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router =Router();

//crear usuario
router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),//esta condicion manda el mensaje si no me menada el nombre
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('password','contraseña obligatorio').not().isEmpty(),
    check('correo','formato de correo erroneo').isEmail(),
    validarCampos
] ,crearUsuario);

//login usuario
router.post('/ingresar',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('password','contraseña obligatorio').not().isEmpty(),
    check('correo','formato de correo erroneo').isEmail(),
], login
);

//validarJWT
router.get('/renew',validarJWT, renewToken);





module.exports = router;