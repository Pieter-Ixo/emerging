import { IEntityExtended } from "@/types/entityCollections";

export default function sortObjectsBy<T extends Record<string, any>>(
  objects: T[],
  fieldName: string,
  ascending: boolean = true
): T[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort((a, b) => {
    const valueA = a[fieldName];
    const valueB = b[fieldName];

    if (typeof valueA === "string" && typeof valueB === "string") {
      const comparisonResult = valueA.localeCompare(valueB);
      return ascending ? comparisonResult : -comparisonResult;
    }

    const comparisonResult = valueA - valueB;
    return ascending ? comparisonResult : -comparisonResult;
  });
  return sortedObjects;
}

export function sortAssetsByExternalId(
  objects: IEntityExtended[],
  acsending: boolean = true
): IEntityExtended[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort(
    acsending
      ? (a, b) => parseInt(a.externalId, 10) - parseInt(b.externalId, 10)
      : (a, b) => parseInt(b.externalId, 10) - parseInt(a.externalId, 10)
  );
  return sortedObjects;
}
