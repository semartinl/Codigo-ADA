const laberinto = [
    ['#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', '#', ' ', '#'],
    ['#', ' ', '#', '#', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', '#'],
    ['#', '#', '#', '#', ' ', '#'],
    ['#', ' ', ' ', '#', ' ', '#'],
    ['#', '#', '#', '#', '#', '#']
];
const inicio = [5, 1];
const fin = [5, 4];

function esValido(laberinto, fila, columna) {
    const filas = laberinto.length;
    const columnas = laberinto[0].length;
    return fila >= 0 && fila < filas && columna >= 0 && columna < columnas && laberinto[fila][columna] === ' ';
}

function esSalida(fila, columna, fin) {
    return fila === fin[0] && columna === fin[1];
}


function resolverLaberinto(laberinto, fila, columna, camino = []) {
    if(!esValido(laberinto, fila, columna)) {
        return false; // Movimiento inválido
    }
    else{
        laberinto[fila][columna] = 'C'; // Marca la celda como visitada
        camino.push([fila, columna]); // Agrega la celda al camino
        if (esSalida(fila, columna, fin)) {
            console.log('Camino encontrado:', camino);
            return true; // Se encontró la salida
        }
        else{
            if(resolverLaberinto(laberinto, fila + 1, columna, camino) // Abajo
                || resolverLaberinto(laberinto, fila - 1, columna, camino) // Arriba
                || resolverLaberinto(laberinto, fila, columna + 1, camino) // Derecha
                || resolverLaberinto(laberinto, fila, columna - 1, camino)// Izquierda
            ){
                return true; // Se encontró un camino válido
            }
            else {
                laberinto[fila][columna] = 'I'; // Desmarca la celda si no se encontró un camino
                camino.pop(); // Elimina la celda del camino
                return false; // No se encontró un camino válido
            }
            
        }

    }
}

// Llamada inicial
resolverLaberinto(laberinto, inicio[0], inicio[1]);
// Imprimir el laberinto con el camino encontrado
console.log('Laberinto con camino marcado:');
laberinto.forEach(fila => {
    console.log(fila.join(' '));
});