export default function splitCamelCase(camelCaseString: string): string[] {
  const words = camelCaseString
    .replace(/([A-Z])/g, " $1") // Add space before each capital letter
    .trim() // Remove leading/trailing spaces
    .split(/\s+/); // Split by spaces

  return words;
}
