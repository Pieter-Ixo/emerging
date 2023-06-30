export default function shortStr(
  str?: string,
  threshold = 35,
  append = "..."
): string | undefined {
  if (!str) return str;
  if (str.length > threshold) {
    return `${str.slice(0, threshold)}${append}`;
  }
  return str;
}
