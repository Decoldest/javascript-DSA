function fibs(number) {
  let arr = [0];
  if (number === 1) {
    return arr;
  }
  arr.push(1);
  if (number === 2) {
    return arr;
  }

  for (i = 2; i < number; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

console.log(fibs(8));

function fibsRec(number) {
  let arr = [];
  if (number === 1) {
    return [0];
  }
  if (number === 2) {
    return [0, 1];
  }
  arr = fibsRec(number - 1).concat([
    fibsRec(number - 1)[number - 2] + fibsRec(number - 1)[number - 3],
  ]);
  return arr;
}

console.log(fibsRec(8));

function mergeSort(array) {
  if (array.length === 0) return "Array is empty lol";
  if (array.length === 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const [leftSide, rightSide] = [
    mergeSort(array.slice(0, mid)),
    mergeSort(array.slice(mid)),
  ];

  let merged = [];

  let leftIndex = 0,
    rightIndex = 0;
  let leftLength = leftSide.length;
  let rightLength = rightSide.length;

  while (leftIndex < leftLength && rightIndex < rightLength) {
    if (rightSide[rightIndex] < leftSide[leftIndex]) {
      merged.push(rightSide[rightIndex++]);
    } else {
      merged.push(leftSide[leftIndex++]);
    }
  }

  while (leftIndex < leftLength) {
    merged.push(leftSide[leftIndex++]);
  }
  while (rightIndex < rightLength) {
    merged.push(rightSide[rightIndex++]);
  }

  return merged;
}

let array = [3, 2, 1, 13, 8, 5, 0, 1];
console.log(mergeSort(array));

let array2 = [105, 79, 100, 110];
console.log(mergeSort(array2));
