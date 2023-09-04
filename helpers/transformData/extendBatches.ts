import {
  IAddressBatchesEntry,
  IAddressBatchesEntryWithId,
} from "@/types/certificates";

export default function extendBatches(
  batchesToConvert: IAddressBatchesEntry[]
): IAddressBatchesEntryWithId[] {
  return batchesToConvert?.map(([batchId, batch]) => ({
    id: batchId,
    ...batch,
  }));
}
