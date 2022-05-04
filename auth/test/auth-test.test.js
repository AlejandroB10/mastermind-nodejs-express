const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../users.controller');
const teamsController = require('../../teams/teams.controller');

const app = require('../../app').app;

beforeEach(async () => {
    await usersController.registerUser('bettatech', '1234');
    await usersController.registerUser('mastermind', '4321');
})

afterEach(async () => {
    await usersController.cleanUpUsers();
    await teamsController.cleanUpTeam();
});

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401); //Miramos el codigo del status es igual a 401
                done();
            });
    });

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });
    //DEVOLVEMOS 200 cuando el jwt es valido, es decir, tenemos la llave  
    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json') //Enviamos el header 
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/auth/login') //llamos a login que nos devolvera el token que nos devuelve el usuario
            .set('content-type', 'application/json')
            .send({user: 'mastermind', password: '4321'})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams') //Aqui llamos a team con el Authorization, y con el token valido por lo tanto deberia ser valido 
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});

