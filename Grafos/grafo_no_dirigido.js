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

//Clase del grafo no dirigido con un TAD con lista de adyacencias.
class GrafoNoDirigido {
    constructor() {
        this.adjacentsList = new Map();
        this.vertices = new Set();
    }

    insertarVertice(vertice) {
        if (!this.vertices.has(vertice)) {
            this.adjacentsList.set(vertice, new Map());
            this.vertices.add(vertice);
        } else {
            console.log(`El vértice ${vertice} ya existe.`);
        }
    }

    insertarArco(v1, v2, peso = 1) {
        if (!this.adjacentsList.has(v1)) this.insertarVertice(v1);
        if (!this.adjacentsList.has(v2)) this.insertarVertice(v2);

        if (this.adjacentsList.get(v1).has(v2)) {
            console.log(`El arco ${v1}-${v2} ya existe.`);
            return false;
        }
        const aristaV1V2 = new Arista(v1, v2, peso);
        const aristaV2V1 = new Arista(v2, v1, peso);
        this.adjacentsList.get(v1).set(v2, peso);
        this.adjacentsList.get(v2).set(v1, peso);
        return true;
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

    for (let [origen, adyacentes] of this.adjacentsList.entries()) {
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
        if (this.adjacentsList.has(vertice)) {
            const adyacentes = this.adjacentsList.get(vertice);
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

    existeCiclo(verticePartida, visitados = new Set()){
        if(!this.adjacentsList.has(verticePartida)){
            console.log(`El vertice ${verticePartida} no existe.`)
            return []
        }
        visitados.add(verticePartida)
        
        for (let adyacente of this.obtenerAdyacentes(verticePartida)){
            if(visitados.has(adyacente) && visitados.size >=3 ){
                return true
            }
            if(!visitados.has(adyacente)){
                this.existeCiclo(adyacente,visitados)
            }
        }
        return false
    }

    // cicloHamiltoniano(verticePartida, visitados = new Set(), camino = []) {
    //     if (!this.adjacentsList.has(verticePartida)) {
    //         console.log(`El vértice ${verticePartida} no existe.`);
    //         return [];
    //     }

    //     visitados.add(verticePartida);
    //     camino.push(verticePartida);

    //     if (visitados.size === this.vertices.size) {
    //         // Comprobar si hay un arco de vuelta al vértice de partida
    //         if (this.adjacentsList.get(verticePartida).has(camino[0])) {
    //             camino.push(camino[0]); // Añadir el vértice de partida al final del camino
    //             return camino;
    //         } else {
    //             visitados.delete(verticePartida);
    //             camino.pop();
    //             return null; // No se encontró un ciclo Hamiltoniano
    //         }
    //     }

    //     for (let adyacente of this.obtenerAdyacentes(verticePartida)) {
    //         if (!visitados.has(adyacente)) {
    //             const resultado = this.cicloHamiltoniano(adyacente, visitados, camino);
    //             if (resultado) {
    //                 return resultado; // Si se encuentra un ciclo, lo devolvemos
    //             }
    //         }
    //     }

    //     visitados.delete(verticePartida);
    //     camino.pop();
    //     return []; // No se encontró un ciclo Hamiltoniano
    // }

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

const grafo = new GrafoNoDirigido();

['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => grafo.insertarVertice(v));

// Insertamos los arcos con sus pesos
grafo.insertarArco('A', 'B', 4);
grafo.insertarArco('A', 'C', 2);
grafo.insertarArco('B', 'C', 1);
grafo.insertarArco('B', 'D', 5);
grafo.insertarArco('C', 'D', 8);
grafo.insertarArco('C', 'E', 10);
grafo.insertarArco('D', 'E', 2);
grafo.insertarArco('D', 'F', 6);
grafo.insertarArco('E', 'F', 3);

console.log(`Conocoer si el grafo es conexo:${ grafo.esConexo()} `); // Debería ser true
const arcos = grafo.obtenerArcosUnicos()

console.log(arcos)

console.log(grafo.obtenerArcosFromVertice('A')); // Debería mostrar los arcos desde A
console.log(grafo.obtenerAdyacentes('B')); // Debería mostrar los adyacentes a A

console.log(grafo.obtenerVertices()); // Debería mostrar todos los vértices del grafo

console.log(grafo.DFS('E')); // Debería realizar un recorrido DFS desde el vértice A

console.log(grafo.BFS('D')); // Debería realizar un recorrido BFS desde el vértice A

const ArbolMinimo = grafo.Prim('A');
console.log(ArbolMinimo.obtenerVertices()); // Debería mostrar los vértices del árbol mínimo
console.log(ArbolMinimo.obtenerArcosFromVertice('B')); // Debería mostrar los arcos del árbol mínimo desde A

ArbolMinimo.obtenerVertices().forEach(v =>{
    const adyacentes = ArbolMinimo.obtenerAdyacentes(v);
    adyacentes.forEach(vertice =>{
        console.log(`Arista: ${v} - ${vertice}, Peso: ${ArbolMinimo.obtenerPeso(v, vertice)}`);
    })
})

console.log(grafo.obtenerArcosUnicos())

const Kruskal = grafo.Kruskal()
const arcosUnicos = grafo.obtenerArcosUnicos()
console.log(Kruskal.obtenerVertices())
console.log(arcosUnicos)