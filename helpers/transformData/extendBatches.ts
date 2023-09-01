import {
  IAddressBatchesEntry,
  IAddressBatchesEntryConverted,
} from "@/types/certificates";

export default function extendBatches(
  batchesToConvert: IAddressBatchesEntry[]
): IAddressBatchesEntryConverted[] {
  return batchesToConvert?.map(([batchId, batch]) => ({
    id: batchId,
    ...batch,
  }));
}
