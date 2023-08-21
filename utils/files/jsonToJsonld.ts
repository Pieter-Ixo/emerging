export default function jsonToJsonld(obj: any) {
  const jsonString = JSON.stringify(obj, null, 4);

  const blob = new Blob([jsonString], { type: "application/ld+json" });

  return URL.createObjectURL(blob);
}
