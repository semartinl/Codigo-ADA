/**
 * Dado un array de becas con {id, inicio, fin, sueldoMensual},
 * devuelve { maxGanancia, seleccion }.
 */
function maxBecas(becas) {
  // 1. Preprocesar pesos y ordenar por fin
  const n = becas.length;
  becas = becas
    .map(b => ({ 
      ...b,
      peso: (b.fin - b.inicio + 1) * b.sueldoMensual 
    }))
    .sort((a, b) => a.fin - b.fin);

  // 2. Calcular pre[i]: índice de la última beca compatible con i
  const fines = becas.map(b => b.fin);
  const pre = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    // buscamos la mayor j < i con becas[j].fin < becas[i].inicio
    let lo = 0, hi = i - 1, best = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (fines[mid] < becas[i].inicio) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    pre[i] = best;
  }

  // 3. DP: dp[i] = max ganancia usando solo becas[0..i]
  const dp = Array(n).fill(0);
  dp[0] = becas[0].peso;
  for (let i = 1; i < n; i++) {
    // opción1: no coger i => dp[i-1]
    const sinI = dp[i - 1];
    // opción2: coger i => peso[i] + dp[ pre[i] ] (o 0 si pre[i] = -1)
    const conI = becas[i].peso + (pre[i] >= 0 ? dp[pre[i]] : 0);
    dp[i] = Math.max(sinI, conI);
  }

  // 4. Reconstrucción de la solución
  const seleccion = [];
  function reconstruye(i) {
    if (i < 0) return;
    const sinI = i > 0 ? dp[i - 1] : 0;
    const conI = becas[i].peso + (pre[i] >= 0 ? dp[pre[i]] : 0);
    if (conI > sinI) {
      seleccion.push(becas[i].id);
      reconstruye(pre[i]);
    } else {
      reconstruye(i - 1);
    }
  }
  reconstruye(n - 1);

  // la hemos construido de atrás hacia adelante
  seleccion.reverse();

  return {
    maxGanancia: dp[n - 1],
    seleccion
  };
}

// --- Ejemplo con tu tabla ---
const becasEj = [
  { id: 1, inicio: 1, fin: 10, sueldoMensual: 175 },
  { id: 2, inicio: 8, fin: 12, sueldoMensual: 100 },
  { id: 3, inicio: 5, fin: 6,  sueldoMensual: 150 },
  { id: 4, inicio: 1, fin: 4,  sueldoMensual: 300 },
  { id: 5, inicio: 5, fin: 11, sueldoMensual: 100 }
];

const resultado = maxBecas(becasEj);
console.log(resultado);
// Debería mostrar algo como:
// { maxGanancia: 2000, seleccion: [2,3,4] }  (o bien [4,3,2], según orden de reconstrucción)
