import { IAddressBatchesEntry } from "@/types/certificates";

export default function sortBatchesByAmount(
  objects: IAddressBatchesEntry[],
  acsending: boolean = true
) {
  const clone = structuredClone(objects);
  const sortedObjects = clone.sort(
    acsending
      ? (a, b) => a[1].amount - b[1].amount
      : (a, b) => b[1].amount - a[1].amount
  );
  return sortedObjects;
}
