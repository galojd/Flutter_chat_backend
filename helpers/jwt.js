const jwt = require('jsonwebtoken');





const generrarJWT = (uid) => {

   return new Promise ((resolve, reject) => {

    const payload = {uid};

    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token) =>{
        if(err) {
            //no se pudo crear el token
            reject('Mo se pudo generear el JWT');
        } else {
            //TOKEN!
            resolve(token);
        }
    } )

   });

}


module.exports = {
    generrarJWT
}