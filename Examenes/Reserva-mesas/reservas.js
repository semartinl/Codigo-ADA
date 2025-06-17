
class Reserva {
    constructor(id, numeroPersonas,tipo, valor){
        this.id = id
        this.numeroPersonas = numeroPersonas
        this.tipo = tipo
        this.valor = valor
    }
    VorazBeneficio(){
        // dp[0][*] = 0: con 0 reservas no hay beneficio
        for (let w = 0; w <= P; w++) {
        dp[0][w] = 0;
        }
        for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= P; w++) {
    // Opción 1: no coger la reserva i
    let opt1 = dp[i-1][w];

    // Opción 2: cogerla (sólo si cabe)
    let opt2 = -Infinity;
    if (peso[i] <= w) {
      opt2 = valor[i] + dp[i-1][w - peso[i]];
    }

    // Elegimos la mejor
    dp[i][w] = Math.max(opt1, opt2);

    // Guardamos decisión para reconstruir
    take[i][w] = (opt2 > opt1);
  }
}


    }
}
