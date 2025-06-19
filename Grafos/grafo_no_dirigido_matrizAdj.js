class Arista{
    constructor(v1, v2, coste) {
        this.v1 = v1;
        this.v2 = v2;
        this.coste = coste || 1; // Asignar un coste por defecto de 1 si no se proporciona
    }

    toString() {
        return `${this.v1}-${this.v2}`;
    }
    equal(arista){
        if (!(arista instanceof Arista)) {
            console.warn("Se debe de comprobar con una instancia de tipo Arista")
            return false;
        }

        const coste2 = arista.coste
        if(coste2 === this.coste && ((arista.v1 === this.v2  || arista.v2 === this.v1)) && (arista.v1 === this.v1 || arista.v2 === this.v2)){
            return true
        }
        else{
            return false
        }
    }
}

class Vertice {
    constructor(id, name){
        this.id = id
        this.name = name
    }
}

//Clase del grafo no dirigido con un TAD con lista de adyacencias.
class GrafoNoDirigidoMatriz {
constructor() {
        this.Adj = [];                         // Matriz de adyacencia
        this.vertices = new Map();            // Mapa: nombre → índice
        this.indiceToNombre = new Map();      // Mapa: índice → nombre
        this.aristas = new Set();             // Aristas únicas
    }

    insertarVertice(nombre) {
        if (this.vertices.has(nombre)) {
            console.log(`El vértice ${nombre} ya existe.`);
            return;
        }

        const index = this.Adj.length;
        this.vertices.set(nombre, index);
        this.indiceToNombre.set(index, nombre);

        // Expandir la matriz
        this.Adj.forEach(fila => fila.push(0));
        this.Adj.push(new Array(index + 1).fill(0));
    }

    insertarArco(v1, v2, peso = 1) {
        if (!this.vertices.has(v1)) this.insertarVertice(v1);
        if (!this.vertices.has(v2)) this.insertarVertice(v2);

        const i = this.vertices.get(v1);
        const j = this.vertices.get(v2);

        if (this.Adj[i][j] !== 0) {
            console.log(`El arco ${v1}-${v2} ya existe.`);
            return;
        }

        this.Adj[i][j] = peso;
        this.Adj[j][i] = peso;

        const clave = v1 < v2 ? `${v1}-${v2}` : `${v2}-${v1}`;
        this.aristas.add(clave);
    }

    obtenerAdyacentes(v) {
        if (!this.vertices.has(v)) {
            console.log(`El vértice ${v} no existe.`);
            return [];
        }

        const idx = this.vertices.get(v);
        const adyacentes = [];

        for (let j = 0; j < this.Adj.length; j++) {
            if (this.Adj[idx][j] !== 0) {
                adyacentes.push(this.indiceToNombre.get(j));
            }
        }

        return adyacentes;
    }

    obtenerVertices() {
        return Array.from(this.vertices.keys());
    }

    obtenerArcos() {
        const arcos = [];

        for (let i = 0; i < this.Adj.length; i++) {
            for (let j = i + 1; j < this.Adj.length; j++) {
                if (this.Adj[i][j] !== 0) {
                    const v1 = this.indiceToNombre.get(i);
                    const v2 = this.indiceToNombre.get(j);
                    const peso = this.Adj[i][j];
                    const arista = new Arista(v1, v2, peso);
                    arcos.push({ v1, v2, peso });
                }
            }
        }

        return arcos;
    }

    imprimirMatriz() {
        console.log("Matriz de Adyacencia:");
        console.table(this.Adj);
    }

    toString() {
        return this.obtenerArcos()
            .map(a => `${a.v1} - ${a.v2} (peso: ${a.peso})`)
            .join("\n");
    }

    obtenerMatrizAdyacencia(){
        return this.Adj
    }


    obtenerArcosUnicos() {
    const aristas = new Set();
    const agregadas = new Set();

    for (let [origen, adyacentes] of this.Adj.entries()) {
        for (let [destino, peso] of adyacentes.entries()) {
            const clave = origen < destino ? `${origen}-${destino}` : `${destino}-${origen}`;
            if (!agregadas.has(clave)) {
                aristas.add(new Arista(origen, destino, peso));
                agregadas.add(clave);
            }
        }
    }

    return aristas;
}

    obtenerArcosFromVertice(vertice) {
        if (this.Adj.has(vertice)) {
            const adyacentes = this.Adj.get(vertice);
            return Array.from(adyacentes.entries()).map(
                ([v, peso]) => new Arista(vertice, v, peso)
            );
        } else {
            console.log(`El vértice ${vertice} no existe.`);
            return [];
        }
    }

    obtenerPeso(v1, v2) {
        if (
            this.adjacentsList.has(v1) &&
            this.adjacentsList.get(v1).has(v2)
        ) {
            return this.adjacentsList.get(v1).get(v2);
        }
        return null;
    }

    eliminarVertice(vertice) {
        if (this.vertices.has(vertice)) {
            for (let [key, adyacentes] of this.adjacentsList.entries()) {
                adyacentes.delete(vertice);
            }
            this.adjacentsList.delete(vertice);
            this.vertices.delete(vertice);
            return true;
        } else {
            console.log(`El vértice ${vertice} no existe.`);
            return false;
        }
    }

    eliminarArco(v1, v2) {
        if (
            this.adjacentsList.get(v1)?.has(v2) &&
            this.adjacentsList.get(v2)?.has(v1)
        ) {
            this.adjacentsList.get(v1).delete(v2);
            this.adjacentsList.get(v2).delete(v1);
            return true;
        } else {
            console.log(`El arco ${v1}-${v2} no existe.`);
            return false;
        }
    }

    isEmpty() {
        return this.vertices.size === 0;
    }

    clear() {
        this.adjacentsList.clear();
        this.vertices.clear();
    }


    esConexo(){
        if (this.isEmpty()) {
            return true; // Un grafo vacío es conexo
        }
        let conexo = true;

        const vertices = this.obtenerVertices();
        let i = 0;
        while (i < vertices.length && conexo) {
            const verticePartida = vertices[i];
            const camino = this.DFS(verticePartida)
            if(camino.length !== this.vertices.size){
                console.log(`El grafo no es conexo, el vértice ${verticePartida} no conecta con todos los vértices.`);
                conexo = false;
            }
            i++;
        }
        return conexo;

    }

    DFS(verticePartida, visitados = new Set()){
        visitados.add(verticePartida)

        for(let i = 0; i < this.Adj.length; i++){
            if(!visitados.has(i) && this.Adj[verticePartida][i]){
                this.DFS(i, visitados)
            }
        }
        return visitados
    }

    BFS(verticePartida, visitados = new Set()){
        const siguientes = []
        siguientes.push(verticePartida)
        while(siguientes.length !== 0){
            let vertice = siguientes.shift()
            visitados.add(vertice)
            for(let i = 0; i < this.Adj.length ; i++){
                if(!visitados.has(i) && this.Adj[vertice][i]){
                    siguientes.push(i)
                }
            }

        }
        return visitados
    }
    
    Prim(verticePartida = 0){
        const gres = new GrafoNoDirigidoMatriz()
        const visitados = new Set()
        visitados.add(verticePartida)
        while(gres.vertices.size !== this.vertices.size){
            let minPeso = Infinity
            let minVertice = null
            let minOrigen = null
            let minArista = new Arista(null, null, Infinity)
            for(let i = 0; i < visitados.size; i++){
                let vertice = visitados[i]
                for(let j = 0; j < this.Adj.length; j++){
                    if(this.Adj[vertice][j]< minPeso && !visitados.has(j)){
                        minPeso = this.Adj[vertice][j]
                        minVertice = j
                        minOrigen = vertice
                    }
                }
            }
            if(minPeso !== Infinity){
                gres.insertarArco(minOrigen, minVertice, minPeso)
                visitados.add(minVertice)
            }
            else{
                break;
            }
        }
        return gres
    }



}

const grafo = new GrafoNoDirigidoMatriz();

['A', 'B', 'C', 'D', 'E', 'F'].forEach(vertice => grafo.insertarVertice(vertice));

// Insertamos los arcos con sus pesos
grafo.insertarArco('A', 'B', 4);
grafo.insertarArco('A', 'C', 2);
grafo.insertarArco('A','F', 10)
grafo.insertarArco('B', 'C', 1);
grafo.insertarArco('B', 'D', 5);
grafo.insertarArco('C', 'D', 8);
grafo.insertarArco('C', 'E', 10);
grafo.insertarArco('D', 'E', 2);
grafo.insertarArco('D', 'F', 6);
grafo.insertarArco('E', 'F', 3);

console.log(grafo.indiceToNombre.entries())
console.log(grafo.DFS(3))
console.log(grafo.BFS(3))

const minimoPrim = grafo.Prim(0)
console.log(minimoPrim.Adj)