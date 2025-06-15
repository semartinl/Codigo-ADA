import PriorityQueue from './PriorityQueue.js';
class Nodo {
  constructor(n) {
    this.k = 0;
    this.sol = Array(n).fill(null);     // solución parcial
    this.asignado = Array(n).fill(false); // tareas asignadas
    this.tiempo = 0;
    this.tiempoOpt = 0;
  }
}

function preCalculoEstimaciones(tareas){
    const optimo = new Array(tareas.length).fill(0)
    const pesimo = new Array(tareas.length).fill(0)
    let rapido = new Array(tareas.length).fill(0)
    let lento = new Array(tareas.length).fill(0)
    for (let i=0;i < tareas.length;i++){
        rapido[i] = tareas[i][0]
        lento[i] = tareas[i][0]
        for (let j=1;j < tareas[i].length;j++){
            rapido[i] = Math.min(rapido[i],tareas[i][j])
            lento[i] = Math.max(lento[i],tareas[i][j])
        }
    }

    optimo[tareas.length-1] = 0
    pesimo[tareas.length-1] = 0
    for (let i=tareas.length-2;i >= 0;i--){
        optimo[i] = optimo[i+1] + rapido[i+1]
        pesimo[i] = pesimo[i+1] + lento[i+1]
    }

    return {optimo, pesimo, rapido, lento};

}

function asignaciones(T) {
  const n = T.length;
  const { optimo, pesimo } = preCalculoEstimaciones(T);

  let mejorTiempo = pesimo[0];
  let mejorSol = [];

  const cola = new PriorityQueue();
  const raiz = new Nodo(n);
  raiz.tiempoOpt = optimo[0];
  cola.enqueue(raiz, raiz.tiempoOpt);

  while (!cola.isEmpty() && cola.peek().priority <= mejorTiempo) {
    const actual = cola.dequeue().value;

    const X = new Nodo(n);
    X.k = actual.k + 1;
    X.sol = actual.sol.slice();
    X.asignado = actual.asignado.slice();

    for (let t = 0; t < n; t++) {
      if (!X.asignado[t]) {
        X.sol[X.k - 1] = t;
        X.asignado[t] = true;
        X.tiempo = actual.tiempo + T[X.k - 1][t];
        X.tiempoOpt = X.tiempo + optimo[X.k];

        if (X.tiempoOpt <= mejorTiempo) {
          if (X.k === n) {
            mejorSol = X.sol.slice();
            mejorTiempo = X.tiempo;
          } else {
            cola.enqueue(structuredClone(X), X.tiempoOpt); // evitar referencia compartida
            mejorTiempo = Math.min(mejorTiempo, X.tiempo + pesimo[X.k]);
          }
        }

        X.asignado[t] = false; // backtrack
      }
    }
  }

  // convertimos los índices 0-based a 1-based si quieres replicar el pseudocódigo exacto
  return {
    solMejor: mejorSol.map(x => x + 1),
    tiempoMejor: mejorTiempo
  };
}

const T = [
  [9, 2, 7],  // Trabajador 1
  [6, 4, 3],  // Trabajador 2
  [5, 8, 1]   // Trabajador 3
];

const resultado = asignaciones(T);
console.log("Mejor asignación:", resultado.solMejor);