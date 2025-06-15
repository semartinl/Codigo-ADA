function MergeSort(lista, indice){
    Ordena(lista, 0, indice)
}

function Ordena(lista, izq, der){
    let mitad 
    if(izq < der){
        mitad = Math.floor((izq + der) / 2)
        console.log(mitad)
        Ordena(lista, izq, mitad)
        Ordena(lista, mitad+1, der)
        Mezclar(lista, izq, der, mitad)
    }
}

function BubbleSort(lista, izq, der){
    for(let i = 0; i <= der; i++){

        for(let j = i+1; j <= der; j++){
            if(lista[i]> lista[j]){
                let aux = lista[i]
                lista[i] = lista[j]
                lista[j] = aux
            }
        }

    }
}



function Mezclar (lista, izq, der, mitad){
    let listaOutOfPlace = new Array(lista.length).fill(0) 
    let j = mitad + 1
    let h = izq
    let i = izq
    while ((h <= mitad) && (j <= der)){
        console.log(`${lista[h]} VS ${lista[j]}`)
        if(lista[h] <= lista[j]){
            listaOutOfPlace[i] = lista[h]; 
            h = h + 1

        }
        else{
            listaOutOfPlace[i] = lista[j];
            j = j + 1
        }
        console.log(listaOutOfPlace)
        i++
    }
    if(h > mitad){
        // Hago la parte sobrante de la derecha
        for( let k = j; k<= der; k++){
            listaOutOfPlace[i] = lista[k]
            i++
        }
    }
    else{
        for (let k = h; k<= mitad; k++){
            console.log(`k: ${k}`)
            listaOutOfPlace[i] = lista[k]
            i++
        }
    }
    //Se copia todo el contenido de la sublista en la lista original.
    for (let k = izq; k <= der; k++){
        lista[k] = listaOutOfPlace[k]
    }
    
}


function busquedaBinaria(lista, izq, der, elementoABuscar){
    let mitad
    if(izq > der){
        return false
    }
    else {
        mitad = Math.round((izq + der) / 2)
        console.log(mitad)
        if(lista[mitad] === elementoABuscar){
            return true
        }
        else if(lista[mitad] > elementoABuscar) {
            return busquedaBinaria(lista,izq, mitad-1,elementoABuscar)
        }
        else {
            return busquedaBinaria(lista, mitad+1, der, elementoABuscar)
        }
    }
}

const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

console.log(busquedaBinaria(array,0,array.length-1,30))

const randoArray=generarListaRandom(20)
console.log(randoArray)
let mitadArray = Math.round(randoArray.length/2)

const orderedArray = MergeSort(randoArray,10)
console.log(randoArray)

export function generarListaRandom(tamano){
    const lista = []
    for (let i =0; i<tamano; i++){
        let random = Math.round(Math.random()*100)
        lista.push(random)
    }
    return lista
}

