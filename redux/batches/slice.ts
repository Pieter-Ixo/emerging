/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IBatch, IBatchDataFilled } from "@/types/certificates";

// eslint-disable-next-line import/no-cycle
import { fetchAllBatches, fetchBatchById } from "./thunks";

export type IBatchesState = {
  batches: IBatch[];
  isBatchLoading: boolean;
  isBatchesLoading: boolean;
  selectedBatchData: IBatchDataFilled | undefined;
};
const initialState: IBatchesState = {
  isBatchesLoading: false,
  isBatchLoading: false,
  batches: [],
  selectedBatchData: undefined,
};

const BatchesSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    setSelectedBatch: (state, action: PayloadAction<IBatch>) => {
      state.selectedBatchData = action.payload;
    },
  },
  extraReducers(builder) {
    // fetchAllBatches
    builder.addCase(fetchAllBatches.pending, (state) => {
      state.isBatchesLoading = true;
    });
    builder.addCase(fetchAllBatches.fulfilled, (state, action) => {
      state.isBatchesLoading = false;
      state.batches = action.payload;
    });

    // fetchBatchById
    builder.addCase(fetchBatchById.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchById.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.selectedBatchData = action.payload;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedBatch } = BatchesSlice.actions;

export default BatchesSlice.reducer;
