export default class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Métodos auxiliares
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }

  // Intercambia dos elementos del heap
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Inserta un nuevo elemento con su prioridad
  enqueue(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }

  // Elimina y retorna el elemento con mayor prioridad (menor valor numérico)
  dequeue() {
    if (this.isEmpty()) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return top;
  }

  // Ajusta el heap hacia arriba
  heapifyUp(index) {
    let current = index;
    while (current > 0 && this.heap[current].priority < this.heap[this.parent(current)].priority) {
      this.swap(current, this.parent(current));
      current = this.parent(current);
    }
  }

  // Ajusta el heap hacia abajo
  heapifyDown(index) {
    let smallest = index;
    const left = this.left(index);
    const right = this.right(index);

    if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
      smallest = left;
    }

    if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  // Verifica si está vacía
  isEmpty() {
    return this.heap.length === 0;
  }

  // Retorna el tamaño de la cola
  size() {
    return this.heap.length;
  }

  // Muestra el elemento de mayor prioridad sin eliminarlo
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }
}
