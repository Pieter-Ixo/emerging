/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  IAddressBatches,
  IBatch,
  IBatchDataFilled,
} from "@/types/certificates";
import { IEntity } from "@/types/entityCollections";

// eslint-disable-next-line import/no-cycle
import {
  fetchAllBatches,
  fetchBatchById,
  fetchBatchesEntityByExternalId,
  fetchBatchesByOwnerAddress,
  fetchBatchesByAdminAddress,
} from "./thunks";

export type IBatchesState = {
  batches: IBatch[];
  // TODO: should we remove word Address from naming ? 
  ownerAddressBatches: IAddressBatches;
  adminAddressBatches: IAddressBatches;
  isBatchLoading: boolean;
  isBatchesLoading: boolean;
  selectedBatchData: IBatchDataFilled | undefined;
  batchesEntity: IEntity | undefined;
};
const initialState: IBatchesState = {
  isBatchesLoading: false,
  isBatchLoading: false,
  batches: [],
  ownerAddressBatches: {},
  adminAddressBatches: {},
  selectedBatchData: undefined,
  batchesEntity: undefined,
};

const BatchesSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    setSelectedBatch: (state, action: PayloadAction<IBatch>) => {
      state.selectedBatchData = action.payload;
    },
  },
  // FIXME: EMERGING-147: it throws a warning `createSlice.extraReducers` is deprecated, and will be removed
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

    // fetchBatchesEntityByExternalId
    builder.addCase(fetchBatchesEntityByExternalId.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(
      fetchBatchesEntityByExternalId.fulfilled,
      (state, action) => {
        state.isBatchLoading = false;
        state.batchesEntity = action.payload;
      }
    );

    // fetchBatchesByOwnerAddress
    builder.addCase(fetchBatchesByOwnerAddress.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchesByOwnerAddress.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.ownerAddressBatches = action?.payload?.CARBON?.tokens;
    });

    // fetchBatchesByAdminAddress
    builder.addCase(fetchBatchesByAdminAddress.pending, (state) => {
      state.isBatchLoading = true;
    });
    builder.addCase(fetchBatchesByAdminAddress.fulfilled, (state, action) => {
      state.isBatchLoading = false;
      state.adminAddressBatches = action?.payload?.CARBON?.tokens;
    });

    builder.addCase(HYDRATE, (state, action) => ({
      ...state,
      ...action,
    }));
  },
});

export const { setSelectedBatch } = BatchesSlice.actions;

export default BatchesSlice.reducer;
