const { comprobarJTW } = require('../helpers/jwt');
const {io} = require('../index');//esta es una exportacion por nombre
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');
//mensaje de los sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    console.log(client.handshake.headers['x-token']);

    const [valido , uid] = comprobarJTW(client.handshake.headers['x-token'])

    //verificar autentificacion
    if( !valido){
        return client.disconnect();
    }

    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    client.join(uid);

    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await grabarMensaje(payload);
        io.to( payload.para).emit('mensaje-personal',payload);
        //client.to(payload.para).emit('mensaje-personal',payload);
    })


    console.log(valido,uid);

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', {admin : 'Nuevo mensaje'});
    });
  });