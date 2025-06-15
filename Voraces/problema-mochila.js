import { generarListaRandom } from '../Divide_and_conquer/busqueda_binaria.js';

const gcapacidad = 5;
const gpesos = generarListaRandom(gcapacidad);
const gbeneficios = generarListaRandom(gcapacidad)

const gcantidad  = 180

function ordenarPorBeneficioPorPeso(pesos, beneficios){
    const n = beneficios.length;
    const indices = Array.from({length: n}, (_, i) => i);
    
    indices.sort((a, b) => {
        const ratioA = beneficios[a] / pesos[a];
        const ratioB = beneficios[b] / pesos[b];
        return ratioB - ratioA; // Ordenar de mayor a menor
    });

    const pesosOrdenados = indices.map(i => pesos[i]);
    const beneficiosOrdenados = indices.map(i => beneficios[i]);

    return {pesos: pesosOrdenados, beneficios: beneficiosOrdenados};
}

function knapsackProblem(pesos, beneficios, cantidad){
    const resultados = new Array(beneficios.length + 1).fill(0)
    console.log(resultados)
    const n = beneficios.length;

    let resto = cantidad
    let i = 0
    const {pesos: pesosOrdenados, beneficios: beneficiosOrdenados} = ordenarPorBeneficioPorPeso(pesos, beneficios);
    
    while (i < n && pesos[i] <= resto) {
        resultados[i] = 1;
        resto -= pesos[i];
        i++;
    }
    if (resto > 0) {
        console.log(i)
        resultados[i] = Math.floor(resto / pesos[i-1]);
    }
    return resultados;

}
console.log(knapsackProblem(gpesos, gbeneficios, gcantidad));

