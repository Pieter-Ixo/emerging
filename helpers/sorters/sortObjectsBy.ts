import getNestedField from "@/utils/objects/getNestedField";

export default function sortObjectsBy<T extends Record<string, any>>(
  objects: T[],
  fieldName: string,
  ascending: boolean = true
): T[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort((a, b) => {
    const valueA = getNestedField(fieldName, a);
    const valueB = getNestedField(fieldName, b);

    if (typeof valueA === "string" && typeof valueB === "string") {
      const comparisonResult = valueA.localeCompare(valueB);
      return ascending ? comparisonResult : -comparisonResult;
    }

    const comparisonResult = valueA - valueB;
    return ascending ? comparisonResult : -comparisonResult;
  });
  return sortedObjects;
}