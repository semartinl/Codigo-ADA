# DIVIDE Y VENCERÁS
- Descomponer en k subproblemas del mismo tipo y de menor tamaño
- Resolver independientemente todos los subproblemas (directamente o aplicando el principio de 'divide y vencerás')
- Combinar las soluciones parciales obtenidas para construir la solución del problema original
- **Subproblemas independientes** entre sí. (Si no, no pertenecen a este esquema. Además, coste exponencial. Ej.: Fibonacci, Hanoi.)
- La división en subproblemas debe ser **equilibrada**. (Si no, costes superiores. Ej.: peor caso de Quicksort.)
``` 
    función Divide_y_vencerás (X:Problema): Solución
    inicio
    si EsCasoBase(X) entonces
    S  ResuelveCasoBase(X)
    si no
    a  Dividir(X, Subproblema)
    para i de 1 hasta a hacer
    SolParcial[i] Divide_y_vencerás(Subproblema[i]) finpara
    S  Combinar (SolParcial)
    finsi
    retorna (S)
    fin

```

# Algoritmos voraces
- BASICAMENTE, CUANDO SE BUSCA **OPTIMIZAR** ALGUNA FUNCIÓN O CAMINO
- Suelen utilizarse para resolver problemas de optimización
- Forman parte de los algoritmos de búsqueda local (hill-climbing)
- **Enfoque miope**: se toman decisiones basándose en la información
disponible de manera inmediata, sin tener en cuenta los efectos que estas
decisiones puedan tener en el futuro

- **Elementos que deben identificarse** para resolver un problema mediante
un algoritmo ávido:
  - Hay que resolver un problema de forma óptima
  - Hay un conjunto de candidatos a formar parte de la solución
  - Existe una función de selección que indica cuál es el* mejor de los
  candidatos* que todavía no se han seleccionado ni rechazado (óptimo local)
  - Existe una función que comprueba si un conjunto de seleccionados es
  *factible* (puede ser solución del problema ahora o después de varias
  iteraciones)
  - Existe una función que comprueba si un subconjunto de candidatos es
  o no solución del problema (sea o no óptima)
  - Existe una función objetivo que da el valor de la solución hallada. Es
  la función que hay que optimizar.
- **Principio de optimalidad:** en una secuencia óptima de decisiones, toda
subsecuencia ha de ser óptima también

```
    // C es el conjunto de los candidatos iniciales
    inicio
    S <- Ø //en el conjunto S se construye la solución
    mientras (no solución(S)) Y (C  Ø) hacer
        x <- seleccionar(C)
        C <- C - {x}
        si factible(S  {x}) entonces
            S <- S + {x}
        finsi
    finmientras
    si solución(S) entonces
        retorna S
    sino
        retorna no hay solución
    finsi
    fin
```

# Backtraking
- Se utiliza para resolver problemas donde la solución se pueda expresar
como una** secuencia de decisiones.**
- Se generan todas las secuencias de forma sistemática y organizada
- Es un método exhaustivo de prueba y error: Se hace un recorrido en
profundidad del espacio o árbol de búsqueda. Cuando se encuentra con un
camino acabado o por el que no se puede continuar, el algoritmo retrocede, y
lo intenta por otro camino
- Si existe solución, se encuentra
- Coste exponencial en el caso peor
- El algoritmo puede buscar: 
  - Una solución cualquiera
  - Todas las soluciones
  - La mejor de todas las soluciones

```
Función VueltaAtrás (etapa) : boolean
inicio
    éxito  Falso
    IniciarOpciones
    repetir
        SeleccionarNuevaOpción
        si Aceptable entonces
            AnotarOpción
            si SoluciónCompleta entonces
                éxito  Verdadero
            si no
                éxitoVueltaAtrás (etapa_siguiente)
                si NO éxito entonces
                    CancelarAnotación
                finsi
            finsi
        finsi
    hasta (éxito) O (ÚltimaOpción)
    retorna éxito
fin
```
# Ramificación y poda (Branch and Bound)
- Es decir, para soluciones que se puedan realizar mediante una secuencia de decisiones, pero quitando los caminos que no van a mejorar.
- Similar a los esquemas con backtracking, pero se podan los caminos que
se sabe que no van a mejorar la solución actual.
-** Nodo vivo:** nodo del espacio de soluciones del que no se han generado aún
todos sus hijos.
-** Nodo muerto:** nodo del que no se van a generar más hijos porque:
  - No hay más
  - No es factible
  - No dará una solución mejor que la solución en curso
- **Nodo en curso o en expansión:** nodo del que se están generando hijos.