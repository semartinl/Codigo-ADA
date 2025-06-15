function hamiltoniano(k,matrizAdj, solucion = new Array(matrizAdj.length).fill(0)) {
    siguienteEv(solucion, k, matrizAdj)
    while (solucion[k] !== 0) {
        if (k === matrizAdj.length - 1) {
            console.log('Solución:', solucion);
        } else {
            hamiltoniano(k + 1, matrizAdj, solucion);
        }
        siguienteEv(solucion, k, matrizAdj);
    }

}

function siguienteEv(solucion, k, matrizAdj) {
    const n = matrizAdj.length;
    let encontrado = false;

    do {
        solucion[k] = (solucion[k] + 1) % (n + 1);
        
        if (solucion[k] !== 0) {
            encontrado = false;
            // Chequea si hay arista entre el anterior y el actual
            if (matrizAdj[solucion[k - 1] - 1][solucion[k] - 1]) {
                encontrado = true;
                // Verifica que no se repita el vértice
                let j = 0;
                while (j <= k - 1 && encontrado) {
                    if (solucion[j] === solucion[k]) {
                        encontrado = false;
                    } else {
                        j++;
                    }
                }
                // Si es el último vértice, debe conectar con el primero
                if (encontrado && k === n && !matrizAdj[solucion[n-1] - 1][solucion[0] - 1]) {
                    encontrado = false;
                }
            }
        }
    } while (solucion[k] !== 0 && !encontrado);
}

// Ejemplo de uso
const matrizAdj = [
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 0]
];
const solucion = new Array(matrizAdj.length).fill(0);
solucion[0] = 1; // Comenzamos desde el primer vértice
hamiltoniano(1, matrizAdj, solucion);