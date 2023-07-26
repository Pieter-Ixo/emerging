/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IAddressBatches, IBatch, IBatchDataFilled } from "@/types/certificates";

// eslint-disable-next-line import/no-cycle
import { fetchAllBatches, fetchBatchById, fetchBatchesByAddress } from "./thunks";

export type IBatchesState = {
  batches: IBatch[];
  addressBatches: IAddressBatches;
  isBatchLoading: boolean;
  isBatchesLoading: boolean;
  selectedBatchData: IBatchDataFilled | undefined;
};
const initialState: IBatchesState = {
  isBatchesLoading: false,
  isBatchLoading: false,
  batches: [],
  addressBatches: {},
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

    // fetchBatchesByAddress
    builder.addCase(fetchBatchesByAddress.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchesByAddress.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.addressBatches = action.payload.CARBON.tokens;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedBatch } = BatchesSlice.actions;

export default BatchesSlice.reducer;
