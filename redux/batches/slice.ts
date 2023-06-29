/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IBatch, IBatchDataFilled } from "@/types/certificates";

// eslint-disable-next-line import/no-cycle
import { fetchAllBatches } from "./thunks";

export type IBatchesState = {
  batches: IBatch[];
  isBatchesLoading: boolean;
  selectedBatchData: IBatchDataFilled | undefined;
};
const initialState: IBatchesState = {
  isBatchesLoading: false,
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
    builder.addCase(fetchAllBatches.pending, (state) => {
      state.isBatchesLoading = true;
    });
    builder.addCase(fetchAllBatches.fulfilled, (state, action) => {
      state.isBatchesLoading = false;
      state.batches = action.payload;
      // TODO: below is a temporary expression
      // eslint-disable-next-line prefer-destructuring
      state.selectedBatchData = action.payload[0];
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedBatch } = BatchesSlice.actions;

export default BatchesSlice.reducer;
