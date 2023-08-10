import { IEntityExtended } from "@/types/entityCollections";

export default function sortObjectsBy<T extends Record<string, any>>(
  objects: T[],
  fieldName: string,
  acsending: boolean = true
): T[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort(
    acsending
      ? (a, b) => parseInt(a[fieldName], 10) - parseInt(b[fieldName], 10)
      : (a, b) => parseInt(b[fieldName], 10) - parseInt(a[fieldName], 10)
  );
  return sortedObjects;
}

export function sortAssetsByAlsoKnownAs(
  objects: IEntityExtended[],
  acsending: boolean = true
): IEntityExtended[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort(
    acsending
      ? (a, b) =>
          parseInt(a.alsoKnownAs.split(`#`)[1], 10) -
          parseInt(b.alsoKnownAs.split(`#`)[1], 10)
      : (a, b) =>
          parseInt(b.alsoKnownAs.split(`#`)[1], 10) -
          parseInt(a.alsoKnownAs.split(`#`)[1], 10)
  );
  return sortedObjects;
}
