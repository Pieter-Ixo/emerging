export default function isStringArraysEqual(
  arr1: string[],
  arr2: string[]
): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] !== arr1[i]) return false;
  }
  return true;
}
