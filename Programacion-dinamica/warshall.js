function warshall(matrizAdj){
    const filas = matrizAdj.length;
    const columnas = matrizAdj[0].length;
    if(filas !== columnas) {
        throw new Error("La matriz debe ser cuadrada");
    }
    const resultado = new Array(filas)
        .fill(null)
        .map((_, i) => matrizAdj[i].slice());

    for (let k = 0; k < filas; k++) {
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                resultado[i][j] = resultado[i][j] || (resultado[i][k] && resultado[k][j]);
            }
        }
        
    }
    return resultado;
}

// Ejemplo de uso
const matrizAdj = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 1],
    [0, 0, 0, 0]
];
const resultado = warshall(matrizAdj);
console.log("Matriz de adyacencia original:");  
console.log(matrizAdj);
console.log("Matriz de cierre transitivo:");
console.log(resultado);