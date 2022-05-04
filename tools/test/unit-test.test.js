//Importamos la libreria de chai para poder trabajar sus funcionalidades
const assert = require('chai').assert;

function addValue(a, b) {
    return a+b;
}
//Describe se trata de una agrupación que contiene todo el conjunto de test 
describe('Suite de prueba para el curso', () => {
    //Describimos el test que se tiene que realizar
    //it nos indica que tiene que devolver el test
    it('should return 4', () => {
        //Ejecutamos el test en esta parte
        let va = addValue(2, 2);
        assert.equal(va, 4); // Comprobamos que la funcion que estamos testeando nos devuelve el resultado esperado
    });
});
