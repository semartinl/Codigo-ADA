function fibonacci(n){
    const fib = new Array(n).fill(0);
    fib[0] = 1;
    fib[1] = 1;
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];

}

// Ejemplo de uso
const n = 10; // Cambia este valor para calcular el n-ésimo número de Fibonacci
console.log(`El ${n}-ésimo número de Fibonacci es: ${fibonacci(n)}`); // Debería imprimir 89
// Puedes probar con otros valores de n
const resultado = fibonacci(n); // Cambia este valor para calcular otro número de Fibonacci
console.log(resultado)