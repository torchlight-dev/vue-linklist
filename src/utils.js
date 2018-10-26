export function moveAt({ array, index, at }) {
  let lowerIndex = 0;
  let higherIndex = 0;
  if (index === at || index > array.length - 1 || at > array.length - 1) {
    return array;
  } else if (index > at) {
    lowerIndex = at;
    higherIndex = index;
  } else {
    lowerIndex = index;
    higherIndex = at;
  }
  const element1 = Object.assign({}, array[higherIndex]);
  element1.index = lowerIndex + 1;
  const element2 = Object.assign({}, array[lowerIndex]);
  element2.index = higherIndex + 1;
  const slicedArray1 = array.slice(0, lowerIndex);
  const slicedArray2 = array.slice(lowerIndex + 1, higherIndex);
  const slicedArray3 = array.slice(higherIndex + 1);
  let swappedArray = [];
  swappedArray = slicedArray1;
  swappedArray.push(element1);
  swappedArray = swappedArray.concat(slicedArray2);
  swappedArray.push(element2);
  swappedArray = swappedArray.concat(slicedArray3);
  return swappedArray;
}
