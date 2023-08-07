export default function moreOrEqualZero(num: number | undefined) {
  if (num === undefined) return 0;
  if (num < 0) return 0;
  return num;
}
