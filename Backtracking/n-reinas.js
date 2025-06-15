function posible(k, x) {
    let i = 1;
    let jaque = false;
    while (i < k && !jaque) {
        if (x[i] === x[k] || Math.abs(x[i] - x[k]) === Math.abs(i - k)) {
            jaque = true;
        } else {
            i = i + 1;
        }
    }
    return !jaque;
}

function nreinas(k, sol, n) {
    for (let i = 1; i <= n; i++) {
        sol[k] = i;
        if (posible(k, sol)) {
            if (k === n) {
                console.log(sol.slice(1, n + 1));
            } else {
                nreinas(k + 1, sol, n);
            }
        }
    }
}

// Llamada inicial
const n = 5; // Cambia este valor para el tamaño del tablero
const sol = new Array(n + 1);
nreinas(1, sol, n);
