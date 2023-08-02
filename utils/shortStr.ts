export default function shortStr(
  str?: string,
  threshold = 30,
  saveSymbolsAtTheEnd = 10,
  insert = "..."
): string | undefined {
  if (!str) return str;

  const len = str.length;
  if (len <= threshold) return str;

  const ending = saveSymbolsAtTheEnd ? str.slice(-1 * saveSymbolsAtTheEnd) : "";
  const beginning = str.substring(
    0,
    threshold - saveSymbolsAtTheEnd - insert.length
  );

  return `${beginning}${insert}${ending}`;
}
