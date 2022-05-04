const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
//Accedemos a los objetos de test 
const app = require('../../app').app;

describe('Suite de prueba e2e para el curso', () => {
    //Como estamos realizando un test asincrono debemos indicarle cuando acaba 
    it('should return hello world', (done) => {
        //Comprobamos que la llamada al end point de la / nos devuelva el texto Hello World!'
        //Le decimos a chai que utilice el servidor app
        chai.request(app)
            .get('/') //Una vez hecha la llamada al servidor y se haya realizado los calculos necesarios
            .end((err, res) => {//Recojemos el resultado de la llamada
                chai.assert.equal(res.text, 'Hello World!') //Comprobamos que el resultado tiene sentido
                done(); //Inidicamos cuando acaba el test, justo despues de que se realice la llamada http
            });
    });
});