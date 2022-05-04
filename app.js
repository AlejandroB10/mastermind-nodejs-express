//Importamos la libreria de express para poder realizar las operaciones dentro del protocolo http
const express = require('express');
const middlewares = require('./middlewares');
require('./database');
// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

const app = express();
//Definimos el puerto
const port = 3000;

middlewares.setupMiddlewares(app);
//Este get se ejecuta en la raiz del servicio, a continuacion una vez que recivamos el get devolvemos 
app.get('/', (req, res) => {
    // req es la request, la peticion
    // res es la respuesta
    res.status(200).send('Hello World!')
    console.log(req);
});
app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

//Empezamos a escuchar conexiones, en primer lugar escucha al puerto 3000, y le pasamos el call back que se ejecuta 
//Una vez comience a escuchar el servidor 
app.listen(port, () => {
    console.log('Server started at port 3000');
})
//Exportamos el objeto app, pera poder acceder a el desde cualquier modulo externo
exports.app = app;