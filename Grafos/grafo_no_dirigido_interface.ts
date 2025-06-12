interface GrafoNoDirigido<T> {
    agregarVertice(vertice: T): void;
    agregarArco(v1: T, v2: T): void;
    obtenerArcos(vertice: T): T[];
    obtenerVertices(): T[];
    obtenerAdyacentes(vertice: T): T[];
    eliminarVertice(vertice: T): boolean;
    eliminarArco(v1: T, v2: T): boolean;
    isEmpty(): boolean;
    clear(): void;
}