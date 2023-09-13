import {
  IAddressBatchesEntry,
  IAddressBatchWithId,
} from "@/types/certificates";

export default function convertBatchesToTableView(
  batchesToConvert: IAddressBatchesEntry[]
): IAddressBatchWithId[] {
  return batchesToConvert?.map(([batchId, batch]) => ({
    id: batchId,
    ...batch,
  }));
}
