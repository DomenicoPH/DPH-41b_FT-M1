'use strict'
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if(array.length <= 1) return array;
    let pivot = array[0];
    let left = [];
    let right = [];
    for (let i=1; i < array.length; i++){
        if(array[i] <= pivot){
            left.push(array[i])
        } else {
            right.push(array[i])
        }
    }
    return [...quickSort(left),pivot,...quickSort(right)];
}

function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
    if(array.length <= 1) return array;

    let mid = Math.floor(array.length / 2);
    let left = array.slice(0,mid);
    let right = array.slice(mid);
    
    let sortedL = mergeSort(left);
    let sortedR = mergeSort(right);
    
    return merge(sortedL,sortedR)
  //okey probemos ahora
}

function merge(left,right){
  let arrOrdenado = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length){
      if (left[leftIndex] < right[rightIndex]){
          arrOrdenado.push(left[leftIndex]);
          leftIndex++
      } else {
          arrOrdenado.push(right[rightIndex]);
          rightIndex++
      }
  }
  
  while (leftIndex < left.length){
      arrOrdenado.push(left[leftIndex]);
      leftIndex++
  }
  
  while (rightIndex < right.length){
      arrOrdenado.push(right[rightIndex]);
      rightIndex++
  }
  
  return arrOrdenado;
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
