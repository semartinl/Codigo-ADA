function Floyd(matrizAdj){
    const filas = matrizAdj.length;
    const columnas = matrizAdj[0].length;
    if(filas !== columnas) {
        throw new Error("La matriz debe ser cuadrada");
    }
    
    // Inicializar la matriz de distancias
    const distancias = new Array(filas)
        .fill(null)
        .map((_, i) => matrizAdj[i].slice());
    const matrizFloyd = new Array(filas)
        .fill(null)
        .map(() => new Array(columnas).fill(Infinity));
    // Algoritmo de Floyd-Warshall
    for (let k = 0; k < filas; k++) {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (distancias[i][k] + distancias[k][j] < distancias[i][j]) {
                    distancias[i][j] = distancias[i][k] + distancias[k][j];
                    matrizFloyd[i][j] = k; // Guardar el vértice intermedio
                }
            }
        }
    }
    
    return {distancias, matrizFloyd};
}

// Ejemplo de uso
const matrizAdj = [
    [0, 3, Infinity, 5],
    [2, 0, Infinity, 4],
    [Infinity, 1, 0, Infinity],
    [Infinity, Infinity, 2, 0]
];
const resultado = Floyd(matrizAdj);
console.log("Matriz de adyacencia original:");
console.log(matrizAdj);
console.log("Matriz de distancias más cortas:");
console.log(resultado.distancias);
console.log("Matriz de vértices intermedios:");
console.log(resultado.matrizFloyd);