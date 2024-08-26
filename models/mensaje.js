const { Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    de : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },

    para : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },

    mensaje : {
        type: String,
        required: true 
    },
},{
    timestamps: true
});

//se personaliza la salidad de los datos que muestra la base de datos
MensajeSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    return Object;
})

module.exports = model('Mensaje', MensajeSchema);