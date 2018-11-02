export function moveAt({ array, index, at }) {
  if (index === at || index > array.length -1 || at > array.length - 1) return array;
  let swappedArray = Object.assign([], array);
  const value = swappedArray[index];
  const tail = swappedArray.slice(index + 1);
  swappedArray.splice(index);
  Array.prototype.push.apply(swappedArray, tail);
  swappedArray.splice(at, 0, value);
  return swappedArray;
}