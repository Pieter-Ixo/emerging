import { createAsyncThunk } from "@reduxjs/toolkit";

import { requestBatches } from "@/requests/blocksync";
import { IBatch } from "@/types/certificates";

import { fetchAndFillCollections } from "../entityCollections/thunks";
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from "../store";

// eslint-disable-next-line import/prefer-default-export
export const fetchAllBatches = createAsyncThunk<
  IBatch[],
  void,
  { dispatch: AppDispatch }
>("batches/fetchAllBatches", async (_, { dispatch }): Promise<IBatch[]> => {
  await dispatch(fetchAndFillCollections());
  const batchesResponse = await requestBatches();
  if (!batchesResponse) throw new Error("panica!");

  return batchesResponse;
});
