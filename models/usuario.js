const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre : {
        type: String,
        required: true 
    },

    correo : {
        type: String,
        required: true,
        unique: true 
    },

    password : {
        type: String,
        required: true 
    },

    ponline : {
        type: Boolean,
        default: false 
    },
});

//se personaliza la salidad de los datos que muestra la base de datos
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...Object} = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model('Usuario', UsuarioSchema);