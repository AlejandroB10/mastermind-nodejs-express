const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
    const opts = {
        //Esta contraseña lo sacaras del header de autorización con el esquema jwt
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        //Esta es la contraseña que solo conoce el servidor
        secretOrKey: 'secretPassword' //TODO deberia estar en una variable de entorno
    }
    //Le indicamos que estrategia y pluguin tiene que utilizar de forma concreta para decodificar los tokens
    passport.use(new JwtStrategy(opts, (decoded, done) => { //Funcion de resultado, el middleware nos devuelve el usuario que esta decodificando 
        return done(null, decoded);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next();
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;