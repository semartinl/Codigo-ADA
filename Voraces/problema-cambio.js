const listaMonedas = [200, 100,50,20, 10, 5, 1];

/*
1. Parámetros
    - Importe que hay que devolver
    - Valor y cantidad (puede ser infinita) de las monedas válidas
2. Conjunto de candidatos: cada una de las monedas de los distintos tipos
3. Solución: Conjunto de monedas, con valor igual al importe inicial
4. Factible: la suma de los valores de las monedas escogidas no debe
superar el importe que hay que devolver
5. Función objetivo: minimizar el número de monedas devueltas
6. Función de selección: elegir la moneda de mayor valor posible entre
las candidatas

*/

/**
 * 
 * @param {BigInteger} cantidad 
 */


function cambioMonedas(cantidad, monedas) {
    let resultado = new Array(monedas.length).fill(0);
    console.log(`Cantidad a devolver: ${cantidad}`);
    console.log(`Monedas disponibles: ${monedas}`);
    console.log(resultado)
    let resto = cantidad;

    for (let i = 0; i < monedas.length; i++) {
        while (resto >= monedas[i]) {
            resultado[i]++;
            resto -= monedas[i];
        }
    }

    return resultado;
}

console.log(cambioMonedas(123,listaMonedas))