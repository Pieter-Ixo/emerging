import { IEntityExtended } from "@/types/entityCollections";

export default function sortAssetsByAlsoKnownAs(
  objects: IEntityExtended[],
  acsending: boolean = true
): IEntityExtended[] {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort(
    acsending
      ? (a, b) =>
          parseInt(a.alsoKnownAs.replace("{id}#", ""), 10) -
          parseInt(b.alsoKnownAs.replace("{id}#", ""), 10)
      : (a, b) =>
          parseInt(b.alsoKnownAs.replace("{id}#", ""), 10) -
          parseInt(a.alsoKnownAs.replace("{id}#", ""), 10)
  );
  return sortedObjects;
}
