import { createAsyncThunk } from "@reduxjs/toolkit";

import { requestBatches } from "@/requests/blocksync";
import { IBatch } from "@/types/certificates";

import { fetchAndFillCollections } from "../entityCollections/thunks";
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from "../store";
import { setIsBatchesLoading } from "./slice";

// eslint-disable-next-line import/prefer-default-export
export const fetchAllBatches = createAsyncThunk<
  IBatch[],
  void,
  { dispatch: AppDispatch }
>("batches/fetchAllBatches", async (_, { dispatch }): Promise<IBatch[]> => {
  dispatch(setIsBatchesLoading(true));

  await dispatch(fetchAndFillCollections());

  const batchesResponse = await requestBatches();

  dispatch(setIsBatchesLoading(false));

  if (!batchesResponse) throw new Error("panica!");
  return batchesResponse;
});
