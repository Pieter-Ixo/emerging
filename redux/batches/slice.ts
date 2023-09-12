/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  IAddressBatches,
  IBatch,
  IBatchDataFilled,
} from "@/types/certificates";

import {
  fetchBatchById,
  fetchBatchesByAdminAddress,
  fetchAndFilterAdminOwnerBatches,
} from "./thunks";

export type IBatchesState = {
  isBatchLoading: boolean;
  isBatchesLoading: boolean;
  adminBatchesFiltered: IAddressBatches | undefined;
  ownerFilteredBatches: IAddressBatches | undefined;
  adminBatches: IAddressBatches | undefined;
  ownerAddress: string | undefined;
  selectedBatchData: IBatchDataFilled | undefined;
};
const initialState: IBatchesState = {
  isBatchesLoading: false,
  isBatchLoading: false,
  adminBatchesFiltered: {},
  ownerFilteredBatches: {},
  adminBatches: {},
  ownerAddress: undefined,
  selectedBatchData: undefined,
};

const BatchesSlice = createSlice({
  name: "BatchesSlice",
  initialState,
  reducers: {
    setSelectedBatch: (state, action: PayloadAction<IBatch>) => {
      state.selectedBatchData = action.payload;
    },
  },
  extraReducers(builder) {
    // fetchAndFilterAdminOwnerBatches
    builder.addCase(fetchAndFilterAdminOwnerBatches.pending, (state) => {
      state.isBatchesLoading = true;
    });
    builder.addCase(
      fetchAndFilterAdminOwnerBatches.fulfilled,
      (state, action) => {
        state.isBatchesLoading = false;

        state.adminBatchesFiltered = action.payload.adminFilteredBatches;
        state.ownerFilteredBatches = action.payload.ownerFilteredBatches;
        state.ownerAddress = action.payload.ownerAddress;
      }
    );

    // fetchBatchById
    builder.addCase(fetchBatchById.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchById.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.selectedBatchData = action.payload;
    });

    // fetchBatchesByAdminAddress
    builder.addCase(fetchBatchesByAdminAddress.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchesByAdminAddress.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.adminBatches = action?.payload?.CARBON?.tokens;
    });
  },
});

export const { setSelectedBatch } = BatchesSlice.actions;

export default BatchesSlice.reducer;
