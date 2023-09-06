/* eslint-disable no-param-reassign */
import { requestTransactionByHash } from "@/requests/blocksync";
import { ITransaction } from "@/types/transaction";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactionByHash = createAsyncThunk<ITransaction, string>(
  "batches/fetchBatchesByAddress",
  async (hash: string): Promise<ITransaction> => {
    const batchesResponse = await requestTransactionByHash(hash);

    if (!batchesResponse) throw new Error("panica!");

    return batchesResponse;
  }
);
export default function name() {}
