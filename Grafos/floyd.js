/*
 * Implementación del Algoritmo de Floyd-Warshall en JavaScript
 * junto con la función para recuperar el camino más corto
 * a partir de la matriz de nodos intermedios.
 *
 * Se asume que el grafo se representa como una matriz de adyacencia,
 * donde graph[i][j] es el peso de la arista i->j, o Infinity si no existe.
 */

/**
 * Ejecuta el algoritmo de Floyd-Warshall.
 * @param {number[][]} graph - Matriz de adyacencia (n × n).
 * @returns {{dist: number[][], next: (number|null)[][]}} 
 *   dist: matriz de distancias mínimas.
 *   next: matriz de nodos intermedios para reconstruir caminos.
 */
function floydWarshall(graph) {
    const n = graph.length;
    // Copiamos la matriz de distancias
    const dist = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => graph[i][j])
    );
    // Matriz para reconstruir caminos: next[i][j] = siguiente nodo en el camino de i a j
    const next = Array.from({ length: n }, () => Array(n).fill(null));

    // Inicializar next con j si existe arista directa
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph[i][j] !== Infinity && i !== j) {
                next[i][j] = j;
            }
        }
    }

    // Núcleo del algoritmo
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const viaK = dist[i][k] + dist[k][j];
                if (viaK < dist[i][j]) {
                    dist[i][j] = viaK;
                    next[i][j] = next[i][k];
                }
            }
        }
    }

    return { dist, next };
}

/**
 * Reconstruye el camino más corto entre dos nodos usando la matriz `next`.
 * @param {number} u - Nodo origen.
 * @param {number} v - Nodo destino.
 * @param {(number|null)[][]} next - Matriz de reconstrucción.
 * @returns {number[] | null} - Lista de nodos en el camino, o null si no hay camino.
 */
function reconstructPath(u, v, next) {
    if (next[u][v] === null) {
        return null; // No existe camino
    }
    const path = [u];
    let current = u;
    while (current !== v) {
        current = next[current][v];
        path.push(current);
    }
    return path;
}

// Ejemplo de uso:
const Infinity = Number.POSITIVE_INFINITY;
const graph = [
    [0, 3, Infinity, 7],
    [8, 0, 2, Infinity],
    [5, Infinity, 0, 1],
    [2, Infinity, Infinity, 0]
];

const { dist, next } = floydWarshall(graph);
console.log('Matriz de distancias:', dist);
console.log('Matriz de reconstrucción:', next);

const path = reconstructPath(0, 3, next);
console.log('Camino más corto de 0 a 3:', path);
