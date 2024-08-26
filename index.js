const express = require('express');
const path = require('path');
require('dotenv').config();
//son las librerias exportadas
//DB Config
const {dbConnection} = require('./database/config');
dbConnection();

//app de express
const app = express();

//Lectura y parseo del Body
app.use(express.json());


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);//estoy exportadno el io como una exportacion tradiciaonal

//Mensajes de Sockets
require('./sockets/socket');




//path publico
const publicPath = path.resolve(__dirname, 'public');

//Con esto mustro el index de public
app.use(express.static(publicPath));

//Mis Rutas
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/usuarios', require('./routes/usuarios'));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('servidor corriendo en puerto', process.env.PORT);
});