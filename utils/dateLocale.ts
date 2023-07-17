export default function dateLocale(
  str: string | undefined
): string | undefined {
  if (str) return new Date(str).toLocaleDateString();
  return str;
}
