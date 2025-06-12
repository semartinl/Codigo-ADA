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

    obtenerArcos(){
        const arcos = new Set()
        this.vertices.forEach(vertice =>{
            const adyacentes = this.obtenerArcosFromVertice(vertice)
            adyacentes.forEach(adyacente =>{
                if(!arcos.has(adyacente)){
                    arcos.add(adyacente)
                }
            })
        })
        return arcos
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

    obtenerVertices() {
        return Array.from(this.vertices);
    }

    obtenerAdyacentes(vertice) {
        if (this.adjacentsList.has(vertice)) {
            return Array.from(this.adjacentsList.get(vertice).keys());
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

    DFS(verticePartida, visitados = new Set()) {
        if (!this.adjacentsList.has(verticePartida)) {
            console.log(`El vértice ${verticePartida} no existe.`);
            return [];
        }

        visitados.add(verticePartida);
       
        for (let adyacente of this.obtenerAdyacentes(verticePartida)) {
            if (!visitados.has(adyacente)) {
                console.log(`Visitando: ${adyacente} desde ${verticePartida}`);
                this.DFS(adyacente, visitados);
            }
        }

        return Array.from(visitados);
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

    BFS(verticePartida, visitados = new Set()) {
        if (!this.adjacentsList.has(verticePartida)) {
            console.log(`El vértice ${verticePartida} no existe.`);
            return [];
        }

        const queue = [verticePartida];
        visitados.add(verticePartida);
        
        while (queue.length > 0) {
            const verticeAux = queue.shift();
            console.log(`Visitando: ${verticeAux} desde ${verticePartida}`);
            for (let adyacente of this.obtenerAdyacentes(verticeAux)) {
                if (!visitados.has(adyacente)) {
                    visitados.add(adyacente);
                    queue.push(adyacente);
                    
                }
            }
        }

        return Array.from(visitados);
    }

    Prim(verticePartida){
        if (!this.adjacentsList.has(verticePartida)) {
            console.log(`El vértice ${verticePartida} no existe.`);
            return [];
        }
        else{
            const gres = new GrafoNoDirigido();
            const visitados = new Set();
            visitados.add(verticePartida);
            gres.insertarVertice(verticePartida);
            while (visitados.size < this.vertices.size) {
                let minArista = null;
                let minPeso = Infinity;

                for (let v of visitados) {
                    for (let [adyacente, peso] of this.adjacentsList.get(v).entries()) {

                        if (!visitados.has(adyacente) && peso < minPeso) {
                            minPeso = peso;
                            minArista = new Arista(v, adyacente, peso);
                        }
                    }
                }
                console.log(`Arista seleccionada: ${minArista ? minArista.toString() : 'Ninguna'}`);
                if (minArista) {
                    gres.insertarArco(minArista.v1, minArista.v2, minArista.coste);

                    visitados.add(minArista.v1);
                    visitados.add(minArista.v2);
                } else {
                    break; // No hay más aristas para agregar
                }
            }
            return gres;
        }
    }
    Kruskal(){

        const gres = new GrafoNoDirigido();
        this.vertices.forEach(v => gres.insertarVertice(v));
        const aristas = this.obtenerArcosUnicos()

        while(!gres.esConexo()){
            let arcosGuardados = gres.obtenerArcosUnicos()
            let aristaMinima = {}
            aristaMinima.coste = Infinity
            console.log("Entra en el bucle")
            console.log(aristaMinima.coste)
            for (let arco of aristas){
                for (let aristaVisitar of arcosGuardados){
                    if(!arcosGuardados.has(arco) && aristaMinima.coste > arco.coste){
                        aristaMinima = arco
                    }
                }
            }
            if(aristaMinima){
                console.log(aristaMinima)
                gres.insertarArco(aristaMinima.v1,aristaMinima.v2,aristaMinima.coste)

            }
            else{
                break;
            }

            
        }
        return gres
    }
}

const grafo = new GrafoNoDirigidoMatriz()
const matrizAdyacencia = grafo.obtenerMatrizAdyacencia()
grafo.insertarVertice("A")
grafo.insertarVertice("B")

// grafo.insertarArco("A", "B")

console.log(grafo.obtenerVertices())
console.log(matrizAdyacencia)