import {
  IAddressBatchesEntry,
  IAddressBatchesEntryExtended,
} from "@/types/certificates";

export default function extendBatches(
  batchesToConvert: IAddressBatchesEntry[]
): IAddressBatchesEntryExtended[] {
  return batchesToConvert?.map(([batchId, batch]) => ({
    id: batchId,
    ...batch,
  }));
}
